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
		// Verify user has access to space
		const { user } = await lucia.validateSession(sessionId);
		if (!user) {
			return json({ error: "Invalid session" }, { status: 401 });
		}
		
		const membership = await db.execute({
			sql: "SELECT * FROM membership WHERE user_id = ? AND space_id = ?",
			args: [user.id, spaceId]
		});
		
		if (membership.rows.length === 0) {
			return json({ error: "Access denied" }, { status: 403 });
		}
		
		// Get messages with user info
		const messages = await db.execute({
			sql: `
				SELECT 
					m.id,
					m.content,
					m.created_at,
					u.name as author_name,
					u.email as author_email,
					u.avatar_url
				FROM message m
				JOIN user u ON m.user_id = u.id
				WHERE m.space_id = ?
				ORDER BY m.created_at DESC
				LIMIT 50
			`,
			args: [spaceId]
		});
		
		return json({ messages: messages.rows });
	} catch (error) {
		console.error("Error fetching messages:", error);
		return json({ error: "Failed to fetch messages" }, { status: 500 });
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
		
		const { content } = await request.json();
		if (!content || !content.trim()) {
			return json({ error: "Message content required" }, { status: 400 });
		}
		
		const messageId = nanoid();
		await db.execute({
			sql: "INSERT INTO message (id, space_id, user_id, content) VALUES (?, ?, ?, ?)",
			args: [messageId, spaceId, user.id, content]
		});
		
		// Return the created message with user info
		const message = await db.execute({
			sql: `
				SELECT 
					m.id,
					m.content,
					m.created_at,
					u.name as author_name,
					u.email as author_email,
					u.avatar_url
				FROM message m
				JOIN user u ON m.user_id = u.id
				WHERE m.id = ?
			`,
			args: [messageId]
		});
		
		return json({ message: message.rows[0] });
	} catch (error) {
		console.error("Error creating message:", error);
		return json({ error: "Failed to create message" }, { status: 500 });
	}
};