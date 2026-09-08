# DevLabs CMS auth

Vercel-safe login for `/devlabs` using env credentials and a signed `httpOnly` session cookie. No database.

## Env vars (Vercel)

| Variable | Required | Notes |
|---|---|---|
| `ADMIN_EMAIL` | yes | Login email |
| `ADMIN_PASSWORD` | one of password/hash | Plain bootstrap password — **rotate** after deploy |
| `ADMIN_PASSWORD_HASH` | preferred | bcryptjs hash; if set, used instead of plain password |
| `ADMIN_SESSION_SECRET` | yes (prod) | ≥32 chars; production fails closed if missing/default |

Copy `.env.example` to `.env` for local `astro dev`.

Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Optional password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
```

## How to login

1. Set the env vars above (local `.env` or Vercel).
2. Open `/devlabs`.
3. Sign in with `ADMIN_EMAIL` + password.
4. You get cookie `ec_devlabs_session` (HMAC-sealed, httpOnly, SameSite=Lax, Secure in prod, ~7 days).
5. `/devlabs/dashboard` is middleware-protected; logout via `/devlabs/logout` or `POST /api/devlabs/logout`.

Product app login remains at https://app.easyclinic.io/ — Header Login is unchanged.

## Routes

- `GET /devlabs` — login UI (noindex)
- `POST /api/devlabs/login` — verify + set cookie
- `GET /devlabs/dashboard` — protected shell
- `GET|POST /devlabs/logout` — clear cookie + redirect
- `POST /api/devlabs/logout` — clear cookie (JSON)
