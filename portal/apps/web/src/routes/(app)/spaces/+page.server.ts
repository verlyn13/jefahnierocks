import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getUserSpaces } from "$lib/server/spaces";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, "/");
	}
	
	const spaces = await getUserSpaces(locals.user.id);
	
	// Format spaces for the UI
	const formattedSpaces = spaces.map(space => ({
		id: space.slug,
		name: space.name,
		hue: space.hue,
		activity: `${space.recent_messages || 0} messages today • ${space.active_promises || 0} active promises`,
		members: space.member_count,
		lastActive: space.recent_messages > 0,
		role: space.role
	}));
	
	return {
		spaces: formattedSpaces
	};
};