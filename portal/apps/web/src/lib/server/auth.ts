import { Lucia } from "lucia";
import { LibsqlAdapter } from "./lucia-libsql-adapter";
import db from "./db";
import type { RequestEvent } from "@sveltejs/kit";

const adapter = new LibsqlAdapter(db);

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
  await db.execute({
    sql: "INSERT INTO user (id, email, name) VALUES (?, ?, ?)",
    args: [userId, email, name || email.split("@")[0]]
  });
  return userId;
}

export async function getUserByEmail(email: string) {
  const result = await db.execute({
    sql: "SELECT * FROM user WHERE email = ?",
    args: [email]
  });
  
  if (result.rows.length === 0) return undefined;
  
  const row = result.rows[0];
  return {
    id: row.id as string,
    email: row.email as string,
    name: row.name as string | null,
    avatar_url: row.avatar_url as string | null
  };
}

export async function getUserById(id: string) {
  const result = await db.execute({
    sql: "SELECT * FROM user WHERE id = ?",
    args: [id]
  });
  
  if (result.rows.length === 0) return undefined;
  
  const row = result.rows[0];
  return {
    id: row.id as string,
    email: row.email as string,
    name: row.name as string | null,
    avatar_url: row.avatar_url as string | null
  };
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