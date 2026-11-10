import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = await db();
    await sql`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[health] database check failed:", err);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
