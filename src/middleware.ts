import { defineMiddleware } from 'astro:middleware';
import { readSession } from './lib/devlabs/auth';

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	const isLoginPage = pathname === '/devlabs' || pathname === '/devlabs/';
	const isLogoutPage = pathname === '/devlabs/logout';
	const isDevlabsPage = pathname.startsWith('/devlabs') && !isLoginPage && !isLogoutPage;

	const isLoginApi = pathname === '/api/devlabs/login';
	const isLogoutApi = pathname === '/api/devlabs/logout';
	const isDevlabsApi =
		pathname.startsWith('/api/devlabs/') && !isLoginApi && !isLogoutApi;

	if (isDevlabsPage || isDevlabsApi) {
		const user = readSession(context.cookies);
		if (!user) {
			if (isDevlabsApi) {
				return new Response(JSON.stringify({ error: 'Unauthorized' }), {
					status: 401,
					headers: { 'Content-Type': 'application/json' },
				});
			}
			return context.redirect('/devlabs');
		}
		context.locals.devlabsUser = user;
	}

	return next();
});
