import { createBrowserClient } from "@supabase/ssr";
import { env } from "$env/dynamic/public";

export const load = async ({
  cookies,
  fetch,
  depends,
}: {
  cookies: any;
  fetch: any;
  depends: (key: string) => void;
}) => {
  depends("supabase:auth");

  const supabase = createBrowserClient(
    env.PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co",
    env.PUBLIC_SUPABASE_ANON_KEY ?? "your-anon-key",
    {
      global: { fetch },
      cookies: {
        get: (name: string) => cookies.get(name) ?? undefined,
        set: (name: string, value: string, options?: any) => {
          const opts: any = {};
          if (options?.path) opts.path = options.path;
          if (options?.httpOnly !== undefined) opts.httpOnly = options.httpOnly;
          if (options?.maxAge !== undefined) opts.maxAge = options.maxAge;
          if (options?.sameSite) opts.sameSite = options.sameSite;
          if (options?.secure !== undefined) opts.secure = options.secure;
          if (options?.domain) opts.domain = options.domain;
          if (options?.expires) opts.expires = options.expires;
          cookies.set(name, value, opts);
        },
        remove: (name: string) => {
          try {
            cookies.delete(name);
          } catch (e) {
            cookies.set(name, "", { maxAge: -1 });
          }
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session };
};
