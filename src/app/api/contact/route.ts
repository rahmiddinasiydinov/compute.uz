import { NextResponse } from "next/server";
import { sendToTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

const MAX = { name: 80, contact: 120, message: 2000, service: 80 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: bots fill every field, humans never see this one
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const contact = clean(body.contact, MAX.contact);
  const message = clean(body.message, MAX.message);
  const service = clean(body.service, MAX.service);

  if (name.length < 2 || contact.length < 3 || message.length < 5) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    await sendToTelegram({ name, contact, message, service: service || undefined });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
