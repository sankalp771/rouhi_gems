import { NextResponse } from "next/server";
import { getCurrentGoldSnapshot } from "@/lib/gold-price";

export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getCurrentGoldSnapshot();

  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
