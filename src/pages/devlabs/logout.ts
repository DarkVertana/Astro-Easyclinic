import type { APIRoute } from 'astro';
import { clearSession } from '../../lib/devlabs/auth';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
	clearSession(cookies);
	return redirect('/devlabs');
};

export const POST: APIRoute = GET;
