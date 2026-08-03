import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import nodemailer from 'nodemailer';
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_APP_PASSWORD,
  CONTACT_TO_EMAIL
} from '$env/static/private';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  subject: 200,
  type: 80,
  message: 5000
} as const;

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (!MAIL_HOST || !MAIL_USER || !MAIL_APP_PASSWORD) return null;

  const port = Number(MAIL_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port,
    secure: port === 465,
    auth: { user: MAIL_USER, pass: MAIL_APP_PASSWORD },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000
  });
  return transporter;
}
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const POST: RequestHandler = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const subject = String(payload.subject ?? '').trim();
  const message = String(payload.message ?? '').trim();
  const type = String(payload.type ?? '').trim();

  if (!name || !email || !message) {
    return json({ error: 'Please fill in your name, email, and message.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    subject.length > MAX_LENGTHS.subject ||
    type.length > MAX_LENGTHS.type ||
    message.length > MAX_LENGTHS.message
  ) {
    return json({ error: 'One of the fields is too long — please shorten your message.' }, { status: 400 });
  }

  const mailer = getTransporter();
  if (!mailer) {
    console.error('[contact] Mail SMTP credentials are not fully configured. ');
    return json(
      { error: 'The contact form is temporarily unavailable. Please email us directly instead.' },
      { status: 503 }
    );
  }

  const to = CONTACT_TO_EMAIL || 'info@mboasports.com';
  const safeName = sanitizeHeaderValue(name);
  const safeSubjectLine = sanitizeHeaderValue(subject) || 'New website inquiry';

  try {
    await mailer.sendMail({
      from: `"MBOA Sports Website" <${MAIL_USER}>`,
      to,
      replyTo: `"${safeName}" <${email}>`,
      subject: `[Contact Form] ${safeSubjectLine}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        type ? `Inquiry Type: ${type}` : null,
        subject ? `Subject: ${subject}` : null,
        '',
        message
      ]
        .filter((line): line is string => line !== null)
        .join('\n'),
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #111111; line-height: 1.5;">
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${type ? `<p style="margin: 0 0 8px;"><strong>Inquiry Type:</strong> ${escapeHtml(type)}</p>` : ''}
          ${subject ? `<p style="margin: 0 0 8px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
        </div>
      `.trim()
    });

    return json({ success: true });
  } catch (err) {
    console.error('[contact] Failed to send via Mail SMTP', err);
    return json({ error: 'Something went wrong sending your message. Please try again.' }, { status: 502 });
  }
};