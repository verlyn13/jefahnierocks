import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // If not authenticated, redirect to verify page
  if (!locals.user) {
    throw redirect(302, `/verify?redirect=${encodeURIComponent(url.pathname)}`);
  }
  
  return {
    user: locals.user
  };
};