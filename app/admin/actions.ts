"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, createSessionValue, isAdmin, passwordMatches, sessionCookieOptions } from "@/lib/admin-auth";
import { setOrderStatus } from "@/lib/orders";
import { sendPaymentReceivedEmail } from "@/lib/email";

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 1000)); // slow down guessing
    return "Incorrect password.";
  }
  (await cookies()).set(ADMIN_COOKIE, createSessionValue(), sessionCookieOptions);
  revalidatePath("/admin");
  return null;
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

export async function markPaid(formData: FormData) {
  if (!(await isAdmin())) return;
  const order = await setOrderStatus(String(formData.get("reference")), "paid");
  if (order) await sendPaymentReceivedEmail(order);
  revalidatePath("/admin");
}

export async function cancelOrder(formData: FormData) {
  if (!(await isAdmin())) return;
  await setOrderStatus(String(formData.get("reference")), "cancelled");
  revalidatePath("/admin");
}
