import Database from "better-sqlite3";
import { dev } from "$app/environment";

const db = new Database(dev ? "portal.db" : "/data/portal.db");
db.pragma("journal_mode = WAL");

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

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
  );

  CREATE TABLE IF NOT EXISTS space (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    hue INTEGER NOT NULL DEFAULT 200,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS membership (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    space_id TEXT NOT NULL REFERENCES space(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'guest')),
    joined_at INTEGER NOT NULL DEFAULT (unixepoch()),
    UNIQUE(user_id, space_id)
  );

  CREATE TABLE IF NOT EXISTS invite (
    id TEXT PRIMARY KEY,
    space_id TEXT NOT NULL REFERENCES space(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'guest')),
    token_hash TEXT UNIQUE NOT NULL,
    expires_at INTEGER NOT NULL,
    accepted_at INTEGER,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS magic_link (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS auth_challenge (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    email TEXT,
    challenge TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('register', 'login')),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_session_user_id ON session(user_id);
  CREATE INDEX IF NOT EXISTS idx_credential_user_id ON credential(user_id);
  CREATE INDEX IF NOT EXISTS idx_membership_user_id ON membership(user_id);
  CREATE INDEX IF NOT EXISTS idx_membership_space_id ON membership(space_id);
  CREATE INDEX IF NOT EXISTS idx_invite_email ON invite(email);
  CREATE INDEX IF NOT EXISTS idx_magic_link_email ON magic_link(email);
`);

export default db;