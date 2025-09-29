import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userId } = await req.json();
    console.log("🎯 Professional Coach checkout for:", email);

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe key not configured");
    }

    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      timeout: 5000, // 5 second timeout
    });

    // Create checkout session for Professional Coach tier - $750/month
    // Includes everything from Personal Plan + 1-on-1 coaching
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: "price_1SCPJLCElVmMOup293vWqNTQ", // Professional Coach $750/month
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      subscription_data: {
        metadata: { 
          user_id: userId,
          tier: "Professional Coach",
        },
      },
    });

    console.log("🎯 Professional Coach session created:", session.url);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("🎯 Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});