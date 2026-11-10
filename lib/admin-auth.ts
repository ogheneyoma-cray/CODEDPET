import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "codedpet_admin";
const SESSION_HOURS = 12;

/** Admin stays locked unless a password of at least 12 characters is configured. */
export function adminConfigured(): boolean {
  return (process.env.ADMIN_PASSWORD ?? "").length >= 12;
}

function sign(payload: string): string {
  return createHmac("sha256", `codedpet-admin:${process.env.ADMIN_PASSWORD}`).update(payload).digest("base64url");
}

export function passwordMatches(input: string): boolean {
  if (!adminConfigured()) return false;
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(process.env.ADMIN_PASSWORD!).digest();
  return timingSafeEqual(a, b);
}

export function createSessionValue(now = Date.now()): string {
  const exp = String(now + SESSION_HOURS * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}

function verify(value: string | undefined): boolean {
  if (!value || !adminConfigured()) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export async function isAdmin(): Promise<boolean> {
  return verify((await cookies()).get(ADMIN_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_HOURS * 3600,
};
