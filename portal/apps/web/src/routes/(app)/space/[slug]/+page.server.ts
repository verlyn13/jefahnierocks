import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { getSpaceBySlug, ensureMembership } from "$lib/server/spaces";
import { getDb } from "$lib/server/db";

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, "/");
	}
	
	const space = await getSpaceBySlug(params.slug);
	if (!space) {
		throw error(404, "Space not found");
	}
	
	const db = getDb();
	
	// Check membership
	const membership = await db.execute({
		sql: "SELECT * FROM membership WHERE user_id = ? AND space_id = ?",
		args: [locals.user.id, space.id]
	});
	
	if (membership.rows.length === 0) {
		// Try to add them if it's a default space
		if (params.slug === "family" || params.slug === "projects") {
			await ensureMembership(locals.user.id, space.id as string, "member");
		} else {
			throw error(403, "Access denied");
		}
	}
	
	// Load initial messages
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
			LIMIT 20
		`,
		args: [space.id]
	});
	
	// Load promises
	const promises = await db.execute({
		sql: `
			SELECT 
				p.*,
				u.name as creator_name
			FROM promise p
			JOIN user u ON p.user_id = u.id
			WHERE p.space_id = ? AND p.status IN ('pending', 'in_progress')
			ORDER BY p.due_date ASC
			LIMIT 10
		`,
		args: [space.id]
	});
	
	return {
		space: {
			id: space.id,
			name: space.name,
			slug: space.slug,
			hue: space.hue
		},
		messages: messages.rows.reverse(), // Reverse to show oldest first
		promises: promises.rows,
		user: locals.user
	};
};