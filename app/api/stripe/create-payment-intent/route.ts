import Stripe from "stripe";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secretKey);

  const body = (await request.json().catch(() => null)) as
    | { amountCents?: number; currency?: string; bundleId?: string; bundleLabel?: string }
    | null;

  const amountCents =
    typeof body?.amountCents === "number" ? Math.floor(body.amountCents) : 0;
  const currency = typeof body?.currency === "string" ? body.currency : "usd";

  if (!Number.isFinite(amountCents) || amountCents < 50) {
    return Response.json(
      { error: "Invalid amountCents (minimum 50 cents)" },
      { status: 400 },
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: {
      bundleId: body?.bundleId ?? "",
      bundleLabel: body?.bundleLabel ?? "",
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}

