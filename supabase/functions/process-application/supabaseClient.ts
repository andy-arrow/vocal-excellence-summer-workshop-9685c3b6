
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";

// These environment variables are set automatically by Supabase Edge Functions
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
