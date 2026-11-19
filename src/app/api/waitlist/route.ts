import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistEntry = {
  name: string;
  email: string;
  topic: string;
  role: "founder" | "mentor";
  createdAt: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; humans leave it empty.
  if (String(body["bot-field"] ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  const topic = String(body.topic ?? "").trim().slice(0, 500);
  const role = body.role === "mentor" ? "mentor" : "founder";

  if (!name) return Response.json({ error: "Please add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please add a valid email." }, { status: 400 });
  }

  const entry: WaitlistEntry = {
    name,
    email,
    topic,
    role,
    createdAt: new Date().toISOString(),
  };

  // Local log (dev / readable disk only — Netlify Forms is handled in the browser).
  if (process.env.NODE_ENV === "development") {
    try {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "waitlist.jsonl"), `${JSON.stringify(entry)}\n`);
    } catch (err) {
      console.error("[waitlist] local persist failed", err);
    }
  }

  try {
    await sendEmails(entry);
  } catch (err) {
    // Signup UX shouldn't fail if mail delivery has issues.
    console.error("[waitlist] email failed", err);
  }

  return Response.json({ ok: true });
}

async function sendEmails(entry: WaitlistEntry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[waitlist] RESEND_API_KEY missing — skipping email.");
    return;
  }

  const from = process.env.RESEND_FROM || "Thirdline <onboarding@resend.dev>";
  const notifyTo = process.env.RESEND_NOTIFY_TO?.trim();
  const resend = new Resend(apiKey);
  const first = entry.name.split(/\s+/)[0] || entry.name;
  const isFounder = entry.role === "founder";

  // Internal copy — works in Resend test mode if NOTIFY_TO is your Resend account email.
  if (notifyTo) {
    const { error: notifyError } = await resend.emails.send({
      from,
      to: notifyTo,
      subject: `New waitlist signup · ${entry.name}`,
      text: [
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        `Role: ${entry.role}`,
        `Topic: ${entry.topic || "(none)"}`,
        `At: ${entry.createdAt}`,
      ].join("\n"),
    });
    if (notifyError) console.error("[waitlist] notify email failed", notifyError.message);
  }

  const { error } = await resend.emails.send({
    from,
    to: entry.email,
    subject: "You're on the Thirdline waitlist",
    html: thanksHtml({ first, isFounder, topic: entry.topic }),
    text: thanksText({ first, isFounder, topic: entry.topic }),
  });

  if (error) throw new Error(error.message);
}

function thanksText({
  first,
  isFounder,
  topic,
}: {
  first: string;
  isFounder: boolean;
  topic: string;
}) {
  const focus = topic
    ? isFounder
      ? `We noted what you're working through: ${topic}.`
      : `We noted the experience you can share: ${topic}.`
    : isFounder
      ? "When access opens, we'll help you find someone who's already worked through a challenge like yours."
      : "When access opens, we'll help connect your experience with founders who need it.";

  return [
    `Hi ${first},`,
    "",
    "Thanks for joining the Thirdline waitlist.",
    "",
    focus,
    "",
    "We'll email you when it's your turn.",
    "",
    "— Thirdline",
    "Advice when you need it",
  ].join("\n");
}

function thanksHtml({
  first,
  isFounder,
  topic,
}: {
  first: string;
  isFounder: boolean;
  topic: string;
}) {
  const focus = topic
    ? isFounder
      ? `We noted what you’re working through: <strong>${escapeHtml(topic)}</strong>.`
      : `We noted the experience you can share: <strong>${escapeHtml(topic)}</strong>.`
    : isFounder
      ? "When access opens, we’ll help you find someone who’s already worked through a challenge like yours."
      : "When access opens, we’ll help connect your experience with founders who need it.";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6f0;font-family:Helvetica,Arial,sans-serif;color:#1b1b1f;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border-radius:20px;padding:36px 32px;">
            <tr>
              <td>
                <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#3f7a17;">Waitlist</p>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.02em;">Thanks for joining, ${escapeHtml(first)}.</h1>
                <p style="margin:18px 0 0;font-size:16px;line-height:1.55;color:#3a3a41;">
                  You’re on the Thirdline waitlist. ${focus}
                </p>
                <p style="margin:18px 0 0;font-size:16px;line-height:1.55;color:#3a3a41;">
                  We’ll email you when access opens.
                </p>
                <p style="margin:28px 0 0;font-size:15px;line-height:1.5;color:#1b1b1f;">
                  — Thirdline<br />
                  <span style="color:#5c5c66;">Advice when you need it</span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
