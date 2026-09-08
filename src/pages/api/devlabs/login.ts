import type { APIRoute } from 'astro';
import {
	SESSION_COOKIE,
	createSessionCookie,
	json,
	sessionCookieOptions,
	verifyCredentials,
} from '../../../lib/devlabs/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
	let body: { email?: string; password?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, 400);
	}

	const email = (body.email || '').trim().toLowerCase();
	const password = body.password || '';
	if (!email || !password) {
		return json({ error: 'Email and password required' }, 400);
	}

	const ok = await verifyCredentials(email, password);
	if (!ok) {
		return json({ error: 'Invalid credentials' }, 401);
	}

	cookies.set(SESSION_COOKIE, createSessionCookie(email), sessionCookieOptions());
	return json({ ok: true, email });
};
