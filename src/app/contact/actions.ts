"use server";

import { headers } from "next/headers";
import { profile } from "@/data/profile";
import { validateContact, type ContactState, type ContactValues } from "@/lib/contact";

// ---- Rate limiting --------------------------------------------------------
// In-memory, per server instance: a sliding window per client IP. Enough to
// blunt casual abuse on a portfolio; use a shared store (e.g. Upstash Redis)
// if stronger guarantees are ever needed.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const MIN_FILL_MS = 3000;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // ---- Spam protection: honeypot + minimum time on the form -------------
  const honeypot = String(formData.get("company") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    // Look successful to bots without sending anything.
    return { status: "success", message: "Message sent." };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Some fields need attention. Fix them and send again.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The contact form isn't connected yet. Email me directly at ${profile.email}.`,
      values,
    };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many messages from your connection. Wait a few minutes, or email me directly.",
      values,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `[Portfolio] ${values.subject}`,
        // Plain text only — user input is never rendered as HTML.
        text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Resend's error body explains the rejection (e.g. unverified sender).
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 500)}`);
    }
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return {
      status: "error",
      message: `Your message couldn't be delivered. Try again in a moment, or email ${profile.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Message sent. Thanks — I'll reply to your email soon.",
  };
}
