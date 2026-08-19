# Inkline Pricing Dashboard

Vite + React app. Deployed on Vercel.

## Local dev
```
npm install
npm run dev
```
Note: `npm run dev` (plain Vite) does not run the `/api` serverless function, so the
app will show the "couldn't reach shared storage" banner locally. Use `vercel dev`
instead if you need the API working locally.

## Shared data storage (required for deploys)
Saved orders, rates, and settings are shared across every user via a serverless
API (`api/data.js`) backed by a Redis KV store. To enable it:

1. In the Vercel dashboard, open this project → **Storage** tab.
2. Create a new **KV** database (Upstash-backed Redis) and connect it to this
   project (choose Production, and Preview if you use preview deployments).
   Vercel automatically injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` as
   environment variables — no manual configuration needed.
3. Redeploy the project so the new environment variables take effect.

Without a linked KV database, `api/data.js` returns a 500 and the app falls
back to showing a "shared storage unreachable" banner (data still works
locally in the browser tab for that session, but won't sync).

## Notes
- The password gate and the shared-storage API both check the same hardcoded
  password (`Inkline`) — it's client-visible obscurity, not real security. Do
  not store anything sensitive that needs real access control.
