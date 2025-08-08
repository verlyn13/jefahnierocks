import { lucia } from "$lib/server/auth";
import { initializeDatabase } from "$lib/server/db";
import type { Handle } from "@sveltejs/kit";

// Initialize database on first request
let dbInitialized = false;
async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize database if needed
  await ensureDbInitialized();
  
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      path: "/"
    });
  }
  
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      path: "/"
    });
  }
  
  event.locals.user = user;
  event.locals.session = session;
  
  return resolve(event);
};