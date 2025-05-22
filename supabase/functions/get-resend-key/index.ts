
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    // Only return a partial key for security
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: "API key not available" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // This is just for verification that the key exists, not for actual use
    // We don't send the full key to the client
    return new Response(
      JSON.stringify({ 
        success: true, 
        keyAvailable: !!RESEND_API_KEY,
        length: RESEND_API_KEY.length,
        prefix: RESEND_API_KEY.substring(0, 3) + "..."
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in get-resend-key function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
