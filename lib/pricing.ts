// Shared by the browser (display) and the server (order totals), so both use the same rate.
export type Currency = "USD" | "NGN";

export const CURRENCIES: Currency[] = ["USD", "NGN"];
export const USD_TO_NGN = 1650;
export const MAX_QUANTITY = 10;

/** Converts a USD catalogue price into the order currency. NGN is rounded to whole naira. */
export function convert(usd: number, currency: Currency): number {
  if (currency === "NGN") return Math.round(usd * USD_TO_NGN);
  return Math.round(usd * 100) / 100;
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}
