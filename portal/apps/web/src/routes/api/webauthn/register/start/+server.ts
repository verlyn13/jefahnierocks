import { json } from "@sveltejs/kit";
import { generateRegistrationChallenge } from "$lib/server/webauthn";

export async function POST({ request }) {
  try {
    const { userId, email } = await request.json();
    
    if (!userId || !email) {
      return json({ error: "User ID and email required" }, { status: 400 });
    }
    
    const options = await generateRegistrationChallenge(userId, email);
    
    return json(options);
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}