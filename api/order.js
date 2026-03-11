/**
 * Vercel Serverless Function: api/order.js
 * This MUST be named 'order.js' inside an 'api' folder.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { customerName, phone, items, totalAmount } = req.body;

  // DEBUG: Check if variables are loading
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.RESTAURANT_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("CRITICAL: Environment Variables are missing in Vercel!");
    return res.status(500).json({
      error:
        "Server configuration missing. Check Vercel Environment Variables.",
    });
  }

  const message = `🍔 *NEW ORDER*\n👤 ${customerName}\n📞 ${phone}\n🛒 ${items}\n💰 Total: ₹${totalAmount}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Accept ✅", callback_data: `accept_${customerName}` },
                { text: "Reject ❌", callback_data: `reject_${customerName}` },
              ],
            ],
          },
        }),
      },
    );

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Telegram API Error:", data);
      return res
        .status(500)
        .json({ error: "Telegram failed to send message", details: data });
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
