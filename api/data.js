// Shared data store for the Inkline Pricing Dashboard.
// Backed by Vercel's Upstash-Redis KV store via its plain REST API
// (no SDK dependency — just fetch), so it works as a zero-config
// Vercel Serverless Function regardless of build tooling.

const KV_KEY = "inkline-v4";
const SHARED_PASSWORD = "Inkline"; // matches the client-side login gate

function authorized(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token === SHARED_PASSWORD;
}

export default async function handler(req, res) {
  const base = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!base || !token) {
    res.status(500).json({ error: "Storage is not configured. Link a KV database to this Vercel project." });
    return;
  }

  if (!authorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    const r = await fetch(`${base}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) {
      res.status(502).json({ error: "Failed to read shared data" });
      return;
    }
    const { result } = await r.json();
    res.status(200).json({ value: result ? JSON.parse(result) : null });
    return;
  }

  if (req.method === "POST") {
    const body = JSON.stringify(req.body ?? {});
    const r = await fetch(`${base}/set/${KV_KEY}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    if (!r.ok) {
      res.status(502).json({ error: "Failed to save shared data" });
      return;
    }
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
