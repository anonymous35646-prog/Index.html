export default async function handler(req, res) {
  // Allow request from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price, master_url } = req.body;

  const SUPABASE_URL = "https://tqyczcqpjyektrzgnwh.supabase.co";
  const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeWN6cWNwanlla3RyanpnbndoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODY4NjAyNSwiZXhwIjoyMTA0MjYyMDI1fQ.2cS8CjQkkFRRqyJSITmRTnBHH3xB4aW9k0IUTpZd7eI";

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.1`, {
      method: "PATCH",
      headers: {
        "apikey": SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ price: Number(price), master_url })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errData = await response.json();
      return res.status(500).json({ error: errData });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
