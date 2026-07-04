import { redirect } from "@sveltejs/kit";

export const load = async ({
  parent,
}: {
  parent: () => Promise<{ session?: unknown }>;
}) => {
  const { session } = await parent();
  if (!session) throw redirect(303, "/login");
  return { session };
};
