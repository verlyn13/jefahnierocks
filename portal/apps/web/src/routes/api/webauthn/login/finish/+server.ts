import { json } from "@sveltejs/kit";
import { verifyAuthentication } from "$lib/server/webauthn";
import { setSession } from "$lib/server/auth";

export async function POST({ request, cookies }) {
  try {
    const { email, response } = await request.json();
    
    if (!email || !response) {
      return json({ error: "Email and response required" }, { status: 400 });
    }
    
    const result = await verifyAuthentication(email, response);
    
    if (!result.verified || !result.userId) {
      return json({ error: "Authentication failed" }, { status: 401 });
    }
    
    // Create session
    await setSession({ cookies } as any, result.userId);
    
    return json({ success: true });
  } catch (error: any) {
    return json({ error: error.message }, { status: 400 });
  }
}