import {
  createBrowserClient,
  createServerClient,
  isBrowser,
} from "@supabase/ssr";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends("supabase:auth");

  if (isBrowser()) {
    const supabase = createBrowserClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { fetch },
      },
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return { supabase, session };
  }

  // On server, `+layout.server.ts` already provides the session in `data`.
  return { session: data?.session } as any;
};
