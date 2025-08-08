import { json } from "@sveltejs/kit";
import { getUserById } from "$lib/server/auth";

export async function GET({ locals }) {
  if (!locals.user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }
  
  return json({
    id: locals.user.id,
    email: locals.user.email,
    name: locals.user.name,
    avatar_url: locals.user.avatar_url
  });
}