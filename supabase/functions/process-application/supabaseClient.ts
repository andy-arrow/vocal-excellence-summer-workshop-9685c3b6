
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// These environment variables are set automatically by Supabase Edge Functions
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Always use service role key to bypass RLS in edge functions
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
