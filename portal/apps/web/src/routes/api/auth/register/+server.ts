import { json } from "@sveltejs/kit";
import { createUser, setSession } from "$lib/server/auth";
import { isEmailAllowed, getWhitelistError } from "$lib/server/whitelist";

export async function POST({ request, cookies }) {
  try {
    const { email, name } = await request.json();
    
    if (!email) {
      return json({ error: "Email required" }, { status: 400 });
    }
    
    // Check whitelist
    if (!isEmailAllowed(email)) {
      return json({ error: getWhitelistError() }, { status: 403 });
    }
    
    const userId = await createUser(email, name);
    await setSession({ cookies } as any, userId);
    
    return json({ userId });
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint")) {
      return json({ error: "User already exists" }, { status: 400 });
    }
    return json({ error: error.message }, { status: 500 });
  }
}