import "server-only";
import { formatMoney } from "./pricing";
import { site } from "./site";
import type { Order } from "./orders";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

/**
 * Sends through Resend when RESEND_API_KEY is set. Without it the email is only
 * logged. Never throws: a failed email must not fail an order.
 */
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[email:log] to=${mail.to} subject="${mail.subject}"\n${mail.text}\n`);
    return true;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || `${site.name} <${site.email}>`,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        reply_to: mail.replyTo,
      }),
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return true;
  } catch (err) {
    console.error(`[email] failed to send "${mail.subject}" to ${mail.to}:`, err);
    return false;
  }
}

const lines = (o: Order) =>
  [
    ...o.items.map((i) => `- ${i.name} × ${i.quantity}: ${formatMoney(i.lineTotal, o.currency)}`),
    `Total: ${formatMoney(o.total, o.currency)}`,
  ].join("\n");

const orderUrl = (ref: string) => `${site.url}/order/${ref}`;

export async function sendOrderPlacedEmails(o: Order) {
  await sendMail({
    to: o.customerEmail,
    subject: `Your ${site.name} order ${o.reference}`,
    replyTo: site.email,
    text: [
      `Hi ${o.customerName},`,
      "",
      "Thanks for your order. We'll email you an invoice with payment details within one business day. Work starts once payment is confirmed.",
      "",
      lines(o),
      "",
      `View your order: ${orderUrl(o.reference)}`,
      "",
      site.name,
    ].join("\n"),
  });
  await sendMail({
    to: site.email,
    subject: `New order ${o.reference}: ${formatMoney(o.total, o.currency)}`,
    replyTo: o.customerEmail,
    text: [
      `Customer: ${o.customerName} <${o.customerEmail}>`,
      `Phone: ${o.customerPhone ?? "-"}`,
      `Company: ${o.companyName ?? "-"}`,
      "",
      lines(o),
      "",
      `Notes: ${o.notes ?? "-"}`,
      "",
      `Send the invoice, then mark it paid at ${site.url}/admin`,
    ].join("\n"),
  });
}

export async function sendPaymentReceivedEmail(o: Order) {
  await sendMail({
    to: o.customerEmail,
    subject: `Payment received for order ${o.reference}`,
    replyTo: site.email,
    text: [
      `Hi ${o.customerName},`,
      "",
      "We've received your payment and work on your order is starting. We'll be in touch shortly to agree the details and timeline.",
      "",
      lines(o),
      "",
      `View your order: ${orderUrl(o.reference)}`,
      "",
      site.name,
    ].join("\n"),
  });
}
