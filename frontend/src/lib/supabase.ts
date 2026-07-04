import { createBrowserClient } from "@supabase/ssr";
import { env } from "$env/dynamic/public";

const supabaseUrl =
  env.PUBLIC_SUPABASE_URL ?? "https://your-project.supabase.co";
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY ?? "your-anon-key";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
