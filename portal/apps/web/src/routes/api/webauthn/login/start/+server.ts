import { json } from "@sveltejs/kit";
import { generateAuthenticationChallenge } from "$lib/server/webauthn";

export async function POST({ request }) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return json({ error: "Email required" }, { status: 400 });
    }
    
    const options = await generateAuthenticationChallenge(email);
    
    return json(options);
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}