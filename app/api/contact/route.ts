import { NextResponse } from "next/server";
import { lab } from "@/data/lab";

export const runtime = "nodejs";

const MAX_LEN = {
  name: 120,
  org: 160,
  email: 160,
  message: 4000,
  enquiryType: 80,
  source: 80,
} as const;

type ContactPayload = {
  name: string;
  org: string;
  email: string;
  message: string;
  enquiryType: string;
  source: string;
  locale: string;
};

function trimField(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(input: Record<string, string>): ContactPayload {
  return {
    name: trimField(input.name).slice(0, MAX_LEN.name),
    org: trimField(input.org).slice(0, MAX_LEN.org),
    email: trimField(input.email).slice(0, MAX_LEN.email),
    message: trimField(input.message).slice(0, MAX_LEN.message),
    enquiryType: trimField(input.enquiryType).slice(0, MAX_LEN.enquiryType),
    source: trimField(input.source).slice(0, MAX_LEN.source) || "website",
    locale: trimField(input.locale).slice(0, 8) || "en",
  };
}

function validate(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  if (!payload.name) errors.name = "required";
  if (!payload.org) errors.org = "required";
  if (!payload.email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "invalid";
  }
  if (!payload.message) errors.message = "required";
  if (!payload.enquiryType) errors.enquiryType = "required";
  return errors;
}

async function deliver(payload: ContactPayload) {
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        to: lab.contactEmail,
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      throw new Error(`webhook_failed:${res.status}`);
    }
    return "webhook" as const;
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() || "FinTechLab <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [lab.contactEmail],
        reply_to: payload.email,
        subject: `[FinTechLab] ${payload.enquiryType} — ${payload.org}`,
        text: [
          `Enquiry type: ${payload.enquiryType}`,
          `Name: ${payload.name}`,
          `Organization: ${payload.org}`,
          `Email: ${payload.email}`,
          `Locale: ${payload.locale}`,
          `Source: ${payload.source}`,
          "",
          payload.message,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      throw new Error(`resend_failed:${res.status}`);
    }
    return "resend" as const;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact] enquiry accepted (dev delivery log)", {
      enquiryType: payload.enquiryType,
      org: payload.org,
      email: payload.email,
      locale: payload.locale,
      source: payload.source,
    });
    return "dev-log" as const;
  }

  return null;
}

function wantsJson(request: Request) {
  const accept = request.headers.get("accept") || "";
  const contentType = request.headers.get("content-type") || "";
  return (
    accept.includes("application/json") ||
    contentType.includes("application/json")
  );
}

function redirectFor(request: Request, status: "sent" | "error") {
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      url.searchParams.set("contact", status);
      url.hash = "work-with-the-lab";
      return NextResponse.redirect(url, 303);
    } catch {
      // fall through
    }
  }
  return NextResponse.redirect(
    new URL(
      `/en/research/agentic-ai?contact=${status}#work-with-the-lab`,
      request.url,
    ),
    303,
  );
}

export async function POST(request: Request) {
  let raw: Record<string, string> = {};

  const contentType = request.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const json = (await request.json()) as Record<string, unknown>;
      raw = Object.fromEntries(
        Object.entries(json).map(([k, v]) => [k, typeof v === "string" ? v : ""]),
      );
    } else {
      const form = await request.formData();
      raw = Object.fromEntries(
        [...form.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]),
      );
    }
  } catch {
    if (wantsJson(request)) {
      return NextResponse.json(
        { ok: false, error: "invalid_body" },
        { status: 400 },
      );
    }
    return redirectFor(request, "error");
  }

  // Honeypot — bots filling hidden field are dropped silently.
  if (trimField(raw.company_website)) {
    if (wantsJson(request)) {
      return NextResponse.json({ ok: true });
    }
    return redirectFor(request, "sent");
  }

  const payload = parsePayload(raw);
  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    if (wantsJson(request)) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    return redirectFor(request, "error");
  }

  try {
    const channel = await deliver(payload);
    if (!channel) {
      if (wantsJson(request)) {
        return NextResponse.json(
          {
            ok: false,
            error: "delivery_unavailable",
            fallbackEmail: lab.contactEmail,
          },
          { status: 503 },
        );
      }
      return redirectFor(request, "error");
    }

    if (wantsJson(request)) {
      return NextResponse.json({ ok: true, delivery: channel });
    }
    return redirectFor(request, "sent");
  } catch {
    if (wantsJson(request)) {
      return NextResponse.json(
        {
          ok: false,
          error: "delivery_failed",
          fallbackEmail: lab.contactEmail,
        },
        { status: 502 },
      );
    }
    return redirectFor(request, "error");
  }
}
