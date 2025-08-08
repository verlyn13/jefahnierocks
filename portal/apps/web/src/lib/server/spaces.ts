import { getDb } from "./db";
import { nanoid } from "nanoid";

export async function ensureDefaultSpaces(userId: string) {
	const db = getDb();
	
	try {
		// Check if family space exists
		const familySpace = await db.execute({
			sql: "SELECT * FROM space WHERE slug = ?",
			args: ["family"]
		});
		
		let familySpaceId: string;
		
		if (familySpace.rows.length === 0) {
			// Create family space
			familySpaceId = nanoid();
			await db.execute({
				sql: "INSERT INTO space (id, name, slug, hue) VALUES (?, ?, ?, ?)",
				args: [familySpaceId, "Jefahnie Family", "family", 198]
			});
		} else {
			familySpaceId = familySpace.rows[0].id as string;
		}
		
		// Check if projects space exists
		const projectsSpace = await db.execute({
			sql: "SELECT * FROM space WHERE slug = ?",
			args: ["projects"]
		});
		
		let projectsSpaceId: string;
		
		if (projectsSpace.rows.length === 0) {
			// Create projects space
			projectsSpaceId = nanoid();
			await db.execute({
				sql: "INSERT INTO space (id, name, slug, hue) VALUES (?, ?, ?, ?)",
				args: [projectsSpaceId, "Personal Projects", "projects", 271]
			});
		} else {
			projectsSpaceId = projectsSpace.rows[0].id as string;
		}
		
		// Add user to both spaces if not already member
		await ensureMembership(userId, familySpaceId, "owner");
		await ensureMembership(userId, projectsSpaceId, "owner");
		
		return { familySpaceId, projectsSpaceId };
	} catch (error) {
		console.error("Error ensuring default spaces:", error);
		throw error;
	}
}

export async function ensureMembership(userId: string, spaceId: string, role: string = "member") {
	const db = getDb();
	
	try {
		// Check if membership exists
		const membership = await db.execute({
			sql: "SELECT * FROM membership WHERE user_id = ? AND space_id = ?",
			args: [userId, spaceId]
		});
		
		if (membership.rows.length === 0) {
			// Create membership
			const membershipId = nanoid();
			await db.execute({
				sql: "INSERT INTO membership (id, user_id, space_id, role) VALUES (?, ?, ?, ?)",
				args: [membershipId, userId, spaceId, role]
			});
		}
	} catch (error) {
		console.error("Error ensuring membership:", error);
		// Ignore duplicate key errors
	}
}

export async function getUserSpaces(userId: string) {
	const db = getDb();
	
	try {
		const spaces = await db.execute({
			sql: `
				SELECT 
					s.id,
					s.name,
					s.slug,
					s.hue,
					m.role,
					m.joined_at,
					COUNT(DISTINCT m2.user_id) as member_count,
					COUNT(DISTINCT msg.id) as recent_messages,
					COUNT(DISTINCT p.id) as active_promises
				FROM space s
				JOIN membership m ON s.id = m.space_id
				LEFT JOIN membership m2 ON s.id = m2.space_id
				LEFT JOIN message msg ON s.id = msg.space_id AND msg.created_at > unixepoch() - 86400
				LEFT JOIN promise p ON s.id = p.space_id AND p.status IN ('pending', 'in_progress')
				WHERE m.user_id = ?
				GROUP BY s.id, s.name, s.slug, s.hue, m.role, m.joined_at
				ORDER BY m.joined_at DESC
			`,
			args: [userId]
		});
		
		return spaces.rows;
	} catch (error) {
		console.error("Error getting user spaces:", error);
		return [];
	}
}

export async function getSpaceById(spaceId: string) {
	const db = getDb();
	
	try {
		const space = await db.execute({
			sql: "SELECT * FROM space WHERE id = ?",
			args: [spaceId]
		});
		
		return space.rows[0] || null;
	} catch (error) {
		console.error("Error getting space:", error);
		return null;
	}
}

export async function getSpaceBySlug(slug: string) {
	const db = getDb();
	
	try {
		const space = await db.execute({
			sql: "SELECT * FROM space WHERE slug = ?",
			args: [slug]
		});
		
		return space.rows[0] || null;
	} catch (error) {
		console.error("Error getting space by slug:", error);
		return null;
	}
}