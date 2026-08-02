import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {env} from '$env/dynamic/private';

let {
  ZOHO_ACCOUNTS_DOMAIN,
  ZOHO_CAMPAIGNS_DOMAIN,
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_LIST_KEY
} = env;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 8000;
// Refresh a little before Zoho's own expiry so we never race a request
// against a token that dies mid-flight.
const TOKEN_REFRESH_SKEW_MS = 60_000;

let cachedAccessToken: string | null = null;
let cachedAccessTokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < cachedAccessTokenExpiresAt - TOKEN_REFRESH_SKEW_MS) {
    return cachedAccessToken;
  }

  const tokenUrl = new URL(`https://${ZOHO_ACCOUNTS_DOMAIN}/oauth/v2/token`);
  tokenUrl.searchParams.set('grant_type', 'refresh_token');
  tokenUrl.searchParams.set('refresh_token', ZOHO_REFRESH_TOKEN);
  tokenUrl.searchParams.set('client_id', ZOHO_CLIENT_ID);
  tokenUrl.searchParams.set('client_secret', ZOHO_CLIENT_SECRET);

  const res = await fetch(tokenUrl, {
    method: 'POST',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Zoho token refresh failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!data.access_token) {
    const reason = data.error_description || data.error || 'unknown error';

    // "invalid_client" is by far the most common failure here, and it is
    // almost never a typo in the credentials themselves — per Zoho's own
    // troubleshooting docs, it's overwhelmingly a DATA CENTER MISMATCH:
    // the Self Client / grant code were created on one Zoho domain
    // (.com, .eu, .in, .com.cn, .jp, .com.au) while ZOHO_ACCOUNTS_DOMAIN
    // points at a different one. Log actionable next steps rather than
    // just the bare error code, so this is diagnosable from server logs
    // alone next time, without needing to come back and re-derive this.
    if (data.error === 'invalid_client') {
      console.error(
        '[newsletter] Zoho rejected the client credentials as invalid. This is ' +
          `almost always one of: (1) DATA CENTER MISMATCH — ZOHO_ACCOUNTS_DOMAIN is ` +
          `currently "${ZOHO_ACCOUNTS_DOMAIN}", but the Self Client / grant code may ` +
          'have been created on a different Zoho domain (.eu, .in, .com.cn, .jp, ' +
          '.com.au) — check the URL you were on in api-console when you generated ' +
          'them, and set ZOHO_ACCOUNTS_DOMAIN + ZOHO_CAMPAIGNS_DOMAIN to match; ' +
          '(2) the Client Secret was regenerated in the API Console since this ' +
          'refresh token was issued, invalidating the old one — regenerate it and ' +
          're-run the one-time refresh-token exchange; (3) a copy/paste error ' +
          '(stray whitespace, a truncated value). See .env.example for the full setup steps.'
      );
    }

    throw new Error(`Zoho token refresh response missing access_token: ${reason}`);
  }

  cachedAccessToken = data.access_token;
  cachedAccessTokenExpiresAt = now + (data.expires_in ?? 3600) * 1000;
  return cachedAccessToken;
}

export const POST: RequestHandler = async ({ request }) => {
  let email: string | undefined;
  let website: string | undefined; // honeypot — see NewsletterSignup.svelte

  try {
    ({ email, website } = await request.json());
  } catch {
    return json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot tripped: a real visitor never sees or fills this field.
  // Report success without ever contacting Zoho or logging anything —
  // silently dropping it is more effective than an obvious rejection.
  if (website) {
    return json({ success: true });
  }

  const trimmedEmail = email?.trim();
  if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
    return json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN || !ZOHO_LIST_KEY) {
    console.error('[newsletter] Zoho Campaigns credentials are not fully configured — see .env.example');
    return json({ error: 'Newsletter sign-up is temporarily unavailable. Please try again later.' }, { status: 503 });
  }

  try {
    const accessToken = await getAccessToken();

    const subscribeUrl = new URL(`https://${ZOHO_CAMPAIGNS_DOMAIN}/api/v1.1/json/listsubscribe`);
    subscribeUrl.searchParams.set('resfmt', 'JSON');
    subscribeUrl.searchParams.set('listkey', ZOHO_LIST_KEY);
    subscribeUrl.searchParams.set('contactinfo', JSON.stringify({ 'Contact Email': trimmedEmail }));
    subscribeUrl.searchParams.set('source', 'Website - Newsletter Signup Form');

    const res = await fetch(subscribeUrl, {
      method: 'POST',
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });

    const body = (await res.json().catch(() => ({}))) as {
      status?: string;
      message?: string;
      code?: string;
    };

    // Zoho's v1.1 API responds HTTP 200 for most outcomes, success or
    // failure — the real signal is the `status`/`code` fields inside the
    // JSON body, not the HTTP status alone. Checking both is the only
    // reliable way to catch a rejected subscribe request.
    if (!res.ok || body.status !== 'success') {
      console.error('[newsletter] Zoho Campaigns responded with an error', res.status, body);
      return json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
    }

    return json({ success: true });
  } catch (err) {
    console.error('[newsletter] Failed to reach Zoho Campaigns', err);
    return json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
  }
};