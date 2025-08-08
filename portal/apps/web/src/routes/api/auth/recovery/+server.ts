import { json } from "@sveltejs/kit";
import { getUserByEmail, setSession } from "$lib/server/auth";
import { isEmailAllowed, getWhitelistError } from "$lib/server/whitelist";

// TEMPORARY RECOVERY ENDPOINT - REMOVE IN PRODUCTION
// This allows whitelisted users to directly login without passkey
export async function POST({ request, cookies }) {
  try {
    const { email, recoveryCode } = await request.json();
    
    if (!email) {
      return json({ error: "Email required" }, { status: 400 });
    }
    
    // Check whitelist
    if (!isEmailAllowed(email)) {
      return json({ error: getWhitelistError() }, { status: 403 });
    }
    
    // Temporary recovery code - CHANGE THIS
    const TEMP_RECOVERY_CODE = "portal-recovery-2025";
    
    if (recoveryCode !== TEMP_RECOVERY_CODE) {
      return json({ error: "Invalid recovery code" }, { status: 401 });
    }
    
    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      // Create user if doesn't exist
      const { createUser } = await import("$lib/server/auth");
      const userId = await createUser(email);
      await setSession({ cookies } as any, userId);
      return json({ success: true, message: "Account created and logged in" });
    }
    
    // Set session
    await setSession({ cookies } as any, user.id);
    
    return json({ success: true, message: "Logged in successfully" });
    
  } catch (error: any) {
    console.error("Recovery error:", error);
    return json({ error: "Recovery failed" }, { status: 500 });
  }
}