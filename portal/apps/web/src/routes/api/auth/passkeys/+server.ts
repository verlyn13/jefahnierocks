import { json } from "@sveltejs/kit";
import { getDb } from "$lib/server/db";

export async function GET({ locals }) {
  if (!locals.user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }
  
  try {
    const result = await getDb().execute({
      sql: "SELECT COUNT(*) as count FROM credential WHERE user_id = ?",
      args: [locals.user.id]
    });
    
    const count = result.rows[0]?.count || 0;
    
    return json({ count });
  } catch (error) {
    return json({ count: 0 });
  }
}