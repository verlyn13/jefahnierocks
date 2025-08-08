import { json } from "@sveltejs/kit";
import { getUserByEmail, setSession } from "$lib/server/auth";
import { getDb } from "$lib/server/db";
import crypto from "crypto";

export async function POST({ request, cookies }) {
  try {
    const { token, email } = await request.json();
    
    if (!token || !email) {
      return json({ error: "Token and email required" }, { status: 400 });
    }
    
    // Hash the token
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    // Check if magic link exists and is valid
    const result = await getDb().execute({
      sql: "SELECT * FROM magic_link WHERE email = ? AND token_hash = ? AND expires_at > ? AND used_at IS NULL",
      args: [email, tokenHash, Date.now()]
    });
    
    if (result.rows.length === 0) {
      return json({ error: "Invalid or expired magic link" }, { status: 400 });
    }
    
    // Mark as used
    await getDb().execute({
      sql: "UPDATE magic_link SET used_at = ? WHERE token_hash = ?",
      args: [Date.now(), tokenHash]
    });
    
    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return json({ error: "User not found" }, { status: 404 });
    }
    
    // Set session
    await setSession({ cookies } as any, user.id);
    
    return json({ success: true });
    
  } catch (error: any) {
    console.error("Magic link verification error:", error);
    return json({ error: "Verification failed" }, { status: 500 });
  }
}