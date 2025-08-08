import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import type { RequestEvent } from "@sveltejs/kit";

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session"
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true,
      sameSite: "strict"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      avatarUrl: attributes.avatar_url
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  name: string | null;
  avatar_url: string | null;
}

export async function createUser(email: string, name?: string) {
  const userId = crypto.randomUUID();
  const stmt = db.prepare(
    "INSERT INTO user (id, email, name) VALUES (?, ?, ?)"
  );
  stmt.run(userId, email, name || email.split("@")[0]);
  return userId;
}

export async function getUserByEmail(email: string) {
  const stmt = db.prepare("SELECT * FROM user WHERE email = ?");
  return stmt.get(email) as DatabaseUserAttributes & { id: string } | undefined;
}

export async function getUserById(id: string) {
  const stmt = db.prepare("SELECT * FROM user WHERE id = ?");
  return stmt.get(id) as DatabaseUserAttributes & { id: string } | undefined;
}

export async function setSession(event: RequestEvent, userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    path: "/"
  });
}

export async function invalidateSession(event: RequestEvent) {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (sessionId) {
    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      path: "/"
    });
  }
}