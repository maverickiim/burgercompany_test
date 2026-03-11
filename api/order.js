export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { customerName, phone, items, totalAmount } = req.body;

  if (!customerName || !phone || !items) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: "Telegram credentials not configured" });
  }

  const message = `
🍔 *NEW ORDER — Burger Company*

👤 *Name:* ${customerName}
📞 *Phone:* ${phone}

🧾 *Items:*
${items}

💰 *Total: ₹${totalAmount}*
`.trim();

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramRes.ok) {
      const err = await telegramRes.json();
      console.error("Telegram error:", err);
      return res.status(500).json({ error: "Failed to send to Telegram" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
