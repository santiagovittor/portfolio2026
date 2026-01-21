import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  // honeypot (bots fill it, humans don't)
  website?: string;
};

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  // IMPORTANT:
  // Do not instantiate Resend at module scope.
  // Next/Vercel can evaluate route modules during build (page data collection).
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Server misconfigured: missing RESEND_API_KEY." },
      { status: 500 }
    );
  }

  if (!to) {
    return Response.json(
      { ok: false, error: "Server misconfigured: missing CONTACT_TO_EMAIL." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const website = (body.website || "").trim();

  // Honeypot: silently accept but do nothing
  if (website.length > 0) {
    return Response.json({ ok: true });
  }

  // Validation
  if (name.length < 2 || name.length > 80) {
    return Response.json({ ok: false, error: "Name must be 2–80 characters." }, { status: 400 });
  }

  if (!emailRegex.test(email) || email.length > 120) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  if (message.length < 10 || message.length > 2000) {
    return Response.json(
      { ok: false, error: "Message must be 10–2000 characters." },
      { status: 400 }
    );
  }

  const subject = `Portfolio contact — ${name}`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  const text = [
    `New portfolio message`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
      <h2 style="margin: 0 0 12px 0;">New portfolio message</h2>
      <p style="margin: 0 0 6px 0;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${safeEmail}</p>
      <div style="padding: 12px; border: 1px solid #e5e5e5; border-radius: 10px;">
        <p style="margin: 0;"><strong>Message:</strong></p>
        <p style="margin: 8px 0 0 0; line-height: 1.5;">${safeMessage}</p>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      replyTo: email,
      text,
      html,
    });

    if (error) {
      return Response.json({ ok: false, error }, { status: 500 });
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (err) {
    return Response.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }
}
