import { json } from "@sveltejs/kit";
import { getUserByEmail } from "$lib/server/auth";

export async function POST({ request }) {
  const { email } = await request.json();
  
  if (!email) {
    return json({ error: "Email required" }, { status: 400 });
  }
  
  const user = await getUserByEmail(email);
  
  return json({ exists: !!user });
}