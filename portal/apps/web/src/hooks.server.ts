import { lucia } from "$lib/server/auth";
import { initializeDatabase } from "$lib/server/db";
import type { Handle } from "@sveltejs/kit";

// Track initialization
let dbInitialized = false;

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize database on first request if not already done
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  }
  
  // Skip auth for health check
  if (event.url.pathname === '/api/health') {
    return resolve(event);
  }
  
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