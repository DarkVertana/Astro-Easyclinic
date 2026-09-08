import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import type { AstroCookies } from 'astro';

export const SESSION_COOKIE = 'ec_devlabs_session';
const SESSION_DAYS = 7;
const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60;

export type DevlabsUser = {
	email: string;
};

const INSECURE_DEFAULTS = new Set([
	'',
	'replace-with-a-long-random-string',
	'replace-with-a-long-random-string-at-least-32',
	'devlabs-insecure-dev-secret-change-me',
	'change-me',
]);

/** Read env from process (Vercel) or import.meta.env (Astro/.env via Vite). */
function env(name: string): string {
	const fromProcess = process.env[name];
	if (typeof fromProcess === 'string' && fromProcess.length > 0) return fromProcess;
	const meta = (import.meta as ImportMeta & { env: Record<string, unknown> }).env;
	const fromMeta = meta?.[name];
	return typeof fromMeta === 'string' ? fromMeta : '';
}

function isProduction(): boolean {
	return import.meta.env.PROD || process.env.NODE_ENV === 'production';
}

function sessionSecret(): string {
	const secret = env('ADMIN_SESSION_SECRET').trim();
	const invalid = !secret || secret.length < 32 || INSECURE_DEFAULTS.has(secret);

	if (invalid) {
		if (isProduction()) {
			throw new Error(
				'ADMIN_SESSION_SECRET must be set to a strong value (min 32 chars) in production'
			);
		}
		// Local-only fallback so `astro dev` works without .env; never used in production.
		return 'dev-only-insecure-secret-min-32-chars!!';
	}

	return secret;
}

function timingSafeStringEqual(a: string, b: string): boolean {
	const aBuf = Buffer.from(a);
	const bBuf = Buffer.from(b);
	if (aBuf.length !== bBuf.length) {
		// Still compare to reduce obvious timing leaks on length mismatch.
		crypto.timingSafeEqual(aBuf, aBuf);
		return false;
	}
	return crypto.timingSafeEqual(aBuf, bBuf);
}

function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

/** Verify credentials against env. Supports plain ADMIN_PASSWORD or bcrypt ADMIN_PASSWORD_HASH. */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
	const expectedEmail = normalizeEmail(env('ADMIN_EMAIL'));
	if (!expectedEmail || !timingSafeStringEqual(normalizeEmail(email), expectedEmail)) {
		// Dummy compare so missing email still burns similar time when a hash is configured.
		const hash = env('ADMIN_PASSWORD_HASH');
		if (hash) await bcrypt.compare(password, hash);
		else if (env('ADMIN_PASSWORD')) {
			timingSafeStringEqual(password, env('ADMIN_PASSWORD'));
		}
		return false;
	}

	const hash = env('ADMIN_PASSWORD_HASH').trim();
	if (hash) {
		return bcrypt.compare(password, hash);
	}

	const plain = env('ADMIN_PASSWORD');
	if (!plain) return false;
	return timingSafeStringEqual(password, plain);
}

type SessionPayload = {
	email: string;
	exp: number;
};

function seal(payload: SessionPayload): string {
	const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
	const sig = crypto.createHmac('sha256', sessionSecret()).update(body).digest('base64url');
	return `${body}.${sig}`;
}

function unseal(value: string | undefined | null): SessionPayload | null {
	if (!value) return null;
	const i = value.lastIndexOf('.');
	if (i <= 0) return null;
	const body = value.slice(0, i);
	const sig = value.slice(i + 1);
	const expected = crypto.createHmac('sha256', sessionSecret()).update(body).digest('base64url');
	try {
		const a = Buffer.from(sig);
		const b = Buffer.from(expected);
		if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
	} catch {
		return null;
	}
	try {
		const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
		if (!payload?.email || typeof payload.exp !== 'number') return null;
		if (payload.exp * 1000 <= Date.now()) return null;
		return payload;
	} catch {
		return null;
	}
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_MAX_AGE) {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax' as const,
		secure: isProduction(),
		maxAge: maxAgeSeconds,
	};
}

export function clearSessionCookieOptions() {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax' as const,
		secure: isProduction(),
		maxAge: 0,
	};
}

/** Create a sealed session cookie value for the given email. */
export function createSessionCookie(email: string): string {
	const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
	return seal({ email: normalizeEmail(email), exp });
}

/** Read and validate the signed session cookie; returns user or null. */
export function readSession(cookies: AstroCookies): DevlabsUser | null {
	const raw = cookies.get(SESSION_COOKIE)?.value;
	const payload = unseal(raw);
	if (!payload) return null;
	return { email: payload.email };
}

/** Clear the session cookie. */
export function clearSession(cookies: AstroCookies): void {
	cookies.delete(SESSION_COOKIE, clearSessionCookieOptions());
}

/** Require an authenticated DevLabs user from cookies. */
export function requireUser(cookies: AstroCookies): DevlabsUser | null {
	return readSession(cookies);
}

export function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}
