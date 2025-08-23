import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { plan } = await req.json();

    // Alegem prețul în funcție de plan
    let priceId;
    if (plan === "hl") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_HL_PRICE_ID;
    } else if (plan === "sl") {
      priceId = process.env.NEXT_PUBLIC_STRIPE_SL_PRICE_ID;
    } else {
      return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400 });
    }

    // Creăm PaymentIntent cu Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 9900, // €99 în cenți
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never"
      },
      metadata: {
        plan: plan
      }
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe PaymentIntent error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
