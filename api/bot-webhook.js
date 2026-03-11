export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("OK");

  const { callback_query } = req.body;
  if (!callback_query) return res.status(200).send("OK");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const [action, name] = callback_query.data.split("_");
  const statusText = action === "accept" ? "✅ ACCEPTED" : "❌ REJECTED";

  const updatedText = `${callback_query.message.text}\n\n━━━━━━━━━━━━━━━\n*STATUS: ${statusText}*`;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: callback_query.message.chat.id,
      message_id: callback_query.message.message_id,
      text: updatedText,
      parse_mode: "Markdown",
    }),
  });

  return res.status(200).json({ ok: true });
}
