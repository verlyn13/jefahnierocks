import { json } from "@sveltejs/kit";
import { generateRegistrationChallenge } from "$lib/server/webauthn";
import { isEmailAllowed, getWhitelistError } from "$lib/server/whitelist";

export async function POST({ request }) {
  try {
    const { userId, email } = await request.json();
    
    if (!userId || !email) {
      return json({ error: "User ID and email required" }, { status: 400 });
    }
    
    // Check whitelist
    if (!isEmailAllowed(email)) {
      return json({ error: getWhitelistError() }, { status: 403 });
    }
    
    const options = await generateRegistrationChallenge(userId, email);
    
    return json(options);
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}