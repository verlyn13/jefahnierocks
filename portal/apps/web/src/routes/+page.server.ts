import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  // If authenticated, go to spaces
  if (locals.user) {
    throw redirect(302, "/spaces");
  }
  
  // Otherwise, go to entry page
  throw redirect(302, "/enter");
};