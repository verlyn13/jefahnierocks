import { createClient, type Client } from "@libsql/client";
import { building } from "$app/environment";
import { env } from "$env/dynamic/private";

// Lazy database client
let db: Client | null = null;
let initialized = false;

export function getDb(): Client {
	if (!db) {
		const isProd = process.env.NODE_ENV === "production";
		// Trim whitespace from environment variables to fix "Invalid URL" error
		const url = env.TURSO_DATABASE_URL?.trim();
		const authToken = env.TURSO_AUTH_TOKEN?.trim();
		
		if (isProd && (!url || !url.startsWith("libsql://"))) {
			throw new Error("In production, TURSO_DATABASE_URL (libsql://...) is required.");
		}
		
		// Only create the client when actually needed
		db = createClient({
			url: url || "file:portal.db",
			authToken: authToken
		});
	}
	return db;
}

// Export a function to initialize the database
export async function initializeDatabase() {
	if (building || initialized) return; // Don't initialize during build or if already done
	initialized = true;
	
	const database = getDb();
	
	try {
		await database.execute(`
		  CREATE TABLE IF NOT EXISTS user (
		    id TEXT PRIMARY KEY,
		    email TEXT UNIQUE NOT NULL,
		    name TEXT,
		    avatar_url TEXT,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS session (
		    id TEXT PRIMARY KEY,
		    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
		    expires_at TEXT NOT NULL,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS credential (
		    id TEXT PRIMARY KEY,
		    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
		    public_key TEXT NOT NULL,
		    credential_id TEXT UNIQUE NOT NULL,
		    counter INTEGER NOT NULL DEFAULT 0,
		    device_type TEXT,
		    device_label TEXT,
		    transports TEXT,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS space (
		    id TEXT PRIMARY KEY,
		    name TEXT NOT NULL,
		    slug TEXT UNIQUE NOT NULL,
		    hue INTEGER NOT NULL DEFAULT 200,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS membership (
		    id TEXT PRIMARY KEY,
		    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
		    space_id TEXT NOT NULL REFERENCES space(id) ON DELETE CASCADE,
		    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'guest')),
		    joined_at INTEGER NOT NULL DEFAULT (unixepoch()),
		    UNIQUE(user_id, space_id)
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS invite (
		    id TEXT PRIMARY KEY,
		    space_id TEXT NOT NULL REFERENCES space(id) ON DELETE CASCADE,
		    email TEXT NOT NULL,
		    role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'guest')),
		    token_hash TEXT UNIQUE NOT NULL,
		    expires_at INTEGER NOT NULL,
		    accepted_at INTEGER,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS magic_link (
		    id TEXT PRIMARY KEY,
		    email TEXT NOT NULL,
		    token_hash TEXT UNIQUE NOT NULL,
		    expires_at INTEGER NOT NULL,
		    used_at INTEGER,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		await database.execute(`
		  CREATE TABLE IF NOT EXISTS auth_challenge (
		    id TEXT PRIMARY KEY,
		    user_id TEXT,
		    email TEXT,
		    challenge TEXT NOT NULL,
		    type TEXT NOT NULL CHECK (type IN ('register', 'login')),
		    expires_at INTEGER NOT NULL,
		    created_at INTEGER NOT NULL DEFAULT (unixepoch())
		  )
		`);

		// Create indexes
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_session_user_id ON session(user_id)`);
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_credential_user_id ON credential(user_id)`);
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_membership_user_id ON membership(user_id)`);
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_membership_space_id ON membership(space_id)`);
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_invite_email ON invite(email)`);
		await database.execute(`CREATE INDEX IF NOT EXISTS idx_magic_link_email ON magic_link(email)`);
	} catch (error) {
		console.error("Database initialization error:", error);
		// Continue even if tables exist
	}
}