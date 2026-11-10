import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validation";
import { CheckoutError, createOrder, markInitFailed, setCheckoutLink } from "@/lib/orders";
import { initializeCrayCheckout } from "@/lib/cray";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 10)) {
    return NextResponse.json({ error: "Too many attempts from this connection. Please try again later." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check your details." }, { status: 400 });
  }

  let order;
  try {
    // Record the order before contacting Cray, so every payment attempt has a row to reconcile.
    order = await createOrder(parsed.data);
  } catch (err) {
    if (err instanceof CheckoutError) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error("[checkout] could not create order:", err);
    return NextResponse.json({ error: "We couldn't place your order. Please try again." }, { status: 500 });
  }

  try {
    const { link } = await initializeCrayCheckout({
      reference: order.reference,
      amount: order.total,
      currency: order.currency,
      narration: `${site.name} order ${order.reference}`,
      callbackUrl: `${site.url}/checkout/callback?reference=${order.reference}`,
      customer: { name: order.customerName, email: order.customerEmail },
      metadata: {
        phone: order.customerPhone ?? "",
        company: order.companyName ?? "",
        items: order.items.map((i) => `${i.name} x${i.quantity}`).join(", "),
      },
    });
    await setCheckoutLink(order.reference, link);
    return NextResponse.json({ reference: order.reference, link }, { status: 201 });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(`[checkout] Cray initialize failed for ${order.reference}: ${reason}`);
    await markInitFailed(order.reference, `Checkout initialize failed: ${reason}`).catch(() => {});
    return NextResponse.json({ error: reason }, { status: 502 });
  }
}
