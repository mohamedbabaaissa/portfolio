# Portfolio: Frontend (React + Vite)

Public portfolio site plus a hidden admin dashboard. Talks to the `backend` folder over HTTP.

## Run it

Start the backend first (see `../backend/README.md`), then:

```
npm install
copy .env.example .env      (Windows)   |   cp .env.example .env   (Mac/Linux)
npm run dev                  # http://localhost:5173
```

`.env`:

| Key | Meaning |
|---|---|
| `VITE_API_URL` | backend URL, e.g. `http://localhost:3001`. Leave empty to use the dev proxy (`/api` goes to `VITE_PROXY_TARGET`, default `http://localhost:3001`). |
| `VITE_ADMIN_PATH` | secret path of the admin login, e.g. `my-door` gives `/my-door`. Pick something only you know. |

Remember to put the frontend URL in the backend's `CLIENT_ORIGIN`.

## Admin

Open `/<VITE_ADMIN_PATH>` and sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from the backend `.env`. Edit your profile, photo, and add/edit/delete projects with images. There is no link to the admin from the public site.

## Build and deploy

```
npm run build        # outputs dist/
```

Upload `dist/` to Vercel, Netlify or any static host. Set `VITE_API_URL` (and `VITE_ADMIN_PATH`) in the host's environment before building. `vercel.json` already has the single-page-app rewrite and basic security headers; on Netlify add a `/* /index.html 200` redirect.

## Design notes (Apple-style)

- Translucent sticky nav with a hairline that appears only after you scroll.
- Size-specific tracking and leading: tight on big headings, relaxed on body text.
- Press feedback on pointer-down (buttons scale to 0.97), one shared easing curve.
- Content reveals on scroll with a small stagger.
- System font stack (no web-font download).
- Respects `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`.

Texts and skills shown on the site live in `src/config.js`.
