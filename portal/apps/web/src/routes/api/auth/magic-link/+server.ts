import { json } from "@sveltejs/kit";
import { getUserByEmail } from "$lib/server/auth";
import { isEmailAllowed, getWhitelistError } from "$lib/server/whitelist";
import { nanoid } from "nanoid";
import { getDb } from "$lib/server/db";
import crypto from "crypto";

export async function POST({ request }) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return json({ error: "Email required" }, { status: 400 });
    }
    
    // Check whitelist
    if (!isEmailAllowed(email)) {
      return json({ error: getWhitelistError() }, { status: 403 });
    }
    
    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return json({ message: "If an account exists, a magic link has been sent to your email." });
    }
    
    // Generate token
    const token = nanoid(32);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    // Store magic link in database
    const linkId = nanoid();
    await getDb().execute({
      sql: "INSERT INTO magic_link (id, email, token_hash, expires_at) VALUES (?, ?, ?, ?)",
      args: [linkId, email, tokenHash, Date.now() + 15 * 60 * 1000] // 15 minutes
    });
    
    // In production, you would send an email here
    // For now, we'll log the link
    const magicLink = `https://jefahnierocks.com/auth/magic?token=${token}&email=${encodeURIComponent(email)}`;
    console.log(`Magic link for ${email}: ${magicLink}`);
    
    // For development/testing, return the token (remove this in production!)
    if (process.env.NODE_ENV !== 'production') {
      return json({ 
        message: "Magic link generated (dev mode)",
        token,
        link: magicLink
      });
    }
    
    return json({ 
      message: "If an account exists, a magic link has been sent to your email." 
    });
    
  } catch (error: any) {
    console.error("Magic link error:", error);
    return json({ error: "Failed to process request" }, { status: 500 });
  }
}