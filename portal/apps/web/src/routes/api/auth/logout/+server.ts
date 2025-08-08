import { json } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

export async function POST({ locals, cookies }) {
  if (!locals.session) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }
  
  await lucia.invalidateSession(locals.session.id);
  
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies.set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    path: "/"
  });
  
  return json({ success: true });
}