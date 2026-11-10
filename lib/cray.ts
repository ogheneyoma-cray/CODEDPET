import "server-only";

// Cray hosted checkout client (see cray-and-shared-postgres.md, section 4).
// Env: CRAY_BASE_URL, CRAY_SECRET_KEY (shared) and CRAY_SUBACCOUNT_TOKEN (this site's own).

/** Thrown when card payments can't be started; the message is safe to show customers. */
export class PaymentUnavailableError extends Error {}

export class CrayError extends Error {
  constructor(message: string, readonly httpStatus: number) {
    super(message);
  }
}

function config() {
  const secretKey = process.env.CRAY_SECRET_KEY;
  const baseUrl = process.env.CRAY_BASE_URL?.replace(/\/+$/, "");
  if (!secretKey || !baseUrl) throw new PaymentUnavailableError("CRAY_SECRET_KEY / CRAY_BASE_URL missing");
  return { secretKey, baseUrl };
}

/** Never guess a sub-account: without this site's own token, payments would settle elsewhere. */
function subaccountToken(): string {
  const token = process.env.CRAY_SUBACCOUNT_TOKEN;
  if (!token) throw new PaymentUnavailableError("CRAY_SUBACCOUNT_TOKEN is not set");
  return token;
}

async function cray<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { secretKey, baseUrl } = config();
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json", Accept: "application/json" },
    signal: AbortSignal.timeout(30_000),
  });
  const body = (await res.json().catch(() => null)) as { status?: boolean; message?: string; data?: T } | null;
  if (!res.ok || !body?.status) {
    if (res.status !== 404) console.error(`[cray] ${path} failed`, res.status, body?.message);
    throw new CrayError(body?.message || `Payment provider error (${res.status})`, res.status);
  }
  return body.data as T;
}

export type CrayPayment = {
  status: string;
  reference: string;
  provider_reference?: string;
  amount?: number;
  currency?: string;
  payment_channel?: string;
};

export function initializeCrayCheckout(params: {
  reference: string;
  amount: number;
  currency: string;
  narration: string;
  callbackUrl: string;
  customer: { name: string; email: string };
  metadata: Record<string, string>;
}) {
  const token = subaccountToken();
  return cray<{ link: string; reference: string }>("/api/checkout/initialize", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      token,
      reference: params.reference,
      defaultPaymentMethod: "card",
      paymentMethods: ["card", "transfer"],
      feeBearer: "merchant",
      narration: params.narration,
      callback_url: params.callbackUrl,
      customer: params.customer,
      metadata: params.metadata,
    }),
  });
}

export const queryCrayPayment = (reference: string) =>
  cray<CrayPayment>(`/api/checkout/query/${encodeURIComponent(reference)}`);

export function mapCrayStatus(raw: string): "paid" | "pending" | "failed" {
  const s = raw.toLowerCase();
  if (/^(success|successful|completed|paid|approved)/.test(s)) return "paid";
  if (/(fail|declin|cancel|revers|expire|reject|error)/.test(s)) return "failed";
  return "pending";
}
