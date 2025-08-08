import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getDb } from "$lib/server/db";
import { lucia } from "$lib/server/auth";
import { nanoid } from "nanoid";

export const GET: RequestHandler = async ({ params, cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		return json({ error: "Not authenticated" }, { status: 401 });
	}
	
	const { spaceId } = params;
	const db = getDb();
	
	try {
		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			return json({ error: "Invalid session" }, { status: 401 });
		}
		
		// Verify membership
		const membership = await db.execute({
			sql: "SELECT * FROM membership WHERE user_id = ? AND space_id = ?",
			args: [user.id, spaceId]
		});
		
		if (membership.rows.length === 0) {
			return json({ error: "Access denied" }, { status: 403 });
		}
		
		// Get promises with user info
		const promises = await db.execute({
			sql: `
				SELECT 
					p.id,
					p.title,
					p.description,
					p.pillar_id,
					p.due_date,
					p.status,
					p.icon,
					p.created_at,
					p.completed_at,
					u.name as creator_name,
					u.email as creator_email
				FROM promise p
				JOIN user u ON p.user_id = u.id
				WHERE p.space_id = ?
				ORDER BY 
					CASE p.status 
						WHEN 'in_progress' THEN 1
						WHEN 'pending' THEN 2
						WHEN 'completed' THEN 3
						WHEN 'cancelled' THEN 4
					END,
					p.due_date ASC
			`,
			args: [spaceId]
		});
		
		return json({ promises: promises.rows });
	} catch (error) {
		console.error("Error fetching promises:", error);
		return json({ error: "Failed to fetch promises" }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ params, request, cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		return json({ error: "Not authenticated" }, { status: 401 });
	}
	
	const { spaceId } = params;
	const db = getDb();
	
	try {
		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			return json({ error: "Invalid session" }, { status: 401 });
		}
		
		// Verify membership
		const membership = await db.execute({
			sql: "SELECT * FROM membership WHERE user_id = ? AND space_id = ?",
			args: [user.id, spaceId]
		});
		
		if (membership.rows.length === 0) {
			return json({ error: "Access denied" }, { status: 403 });
		}
		
		const { title, description, pillar_id, due_date, icon } = await request.json();
		
		if (!title || !pillar_id) {
			return json({ error: "Title and pillar_id required" }, { status: 400 });
		}
		
		const promiseId = nanoid();
		await db.execute({
			sql: `INSERT INTO promise (id, space_id, user_id, title, description, pillar_id, due_date, status, icon) 
			      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
			args: [promiseId, spaceId, user.id, title, description || null, pillar_id, due_date || null, icon || null]
		});
		
		// Return the created promise
		const promise = await db.execute({
			sql: `
				SELECT 
					p.*,
					u.name as creator_name,
					u.email as creator_email
				FROM promise p
				JOIN user u ON p.user_id = u.id
				WHERE p.id = ?
			`,
			args: [promiseId]
		});
		
		return json({ promise: promise.rows[0] });
	} catch (error) {
		console.error("Error creating promise:", error);
		return json({ error: "Failed to create promise" }, { status: 500 });
	}
};

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		return json({ error: "Not authenticated" }, { status: 401 });
	}
	
	const { spaceId } = params;
	const db = getDb();
	
	try {
		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			return json({ error: "Invalid session" }, { status: 401 });
		}
		
		const { promiseId, status } = await request.json();
		
		if (!promiseId || !status) {
			return json({ error: "Promise ID and status required" }, { status: 400 });
		}
		
		// Update promise status
		const completedAt = status === 'completed' ? Date.now() : null;
		await db.execute({
			sql: "UPDATE promise SET status = ?, completed_at = ? WHERE id = ? AND space_id = ?",
			args: [status, completedAt, promiseId, spaceId]
		});
		
		return json({ success: true });
	} catch (error) {
		console.error("Error updating promise:", error);
		return json({ error: "Failed to update promise" }, { status: 500 });
	}
};