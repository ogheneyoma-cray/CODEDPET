import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validation";
import { CheckoutError, createOrder } from "@/lib/orders";
import { sendOrderPlacedEmails } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 10)) {
    return NextResponse.json({ error: "Too many orders from this connection. Please try again later." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check your details." }, { status: 400 });
  }
  try {
    const order = await createOrder(parsed.data);
    await sendOrderPlacedEmails(order);
    return NextResponse.json({ reference: order.reference }, { status: 201 });
  } catch (err) {
    if (err instanceof CheckoutError) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error("[checkout] failed:", err);
    return NextResponse.json({ error: "We couldn't place your order. Please try again." }, { status: 500 });
  }
}
