import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const trackingId = process.env.GHL_TRACKING_ID?.trim() ?? "";
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(trackingId)) {
    return new NextResponse(null, {
      status: 204,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(
    { trackingId },
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}
