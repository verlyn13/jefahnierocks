import { json } from "@sveltejs/kit";
import { verifyRegistration } from "$lib/server/webauthn";

export async function POST({ request }) {
  try {
    const { userId, response } = await request.json();
    
    if (!userId || !response) {
      return json({ error: "User ID and response required" }, { status: 400 });
    }
    
    const verification = await verifyRegistration(userId, response);
    
    if (!verification.verified) {
      return json({ error: "Registration failed" }, { status: 400 });
    }
    
    return json({ success: true });
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}