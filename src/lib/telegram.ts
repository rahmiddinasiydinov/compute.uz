export type ContactPayload = {
  name: string;
  contact: string;
  message: string;
  service?: string;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendToTelegram(payload: ContactPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram is not configured");
  }

  const lines = [
    "<b>New request from compute.uz</b>",
    "",
    `<b>Name:</b> ${escapeHtml(payload.name)}`,
    `<b>Contact:</b> ${escapeHtml(payload.contact)}`,
    payload.service ? `<b>Service:</b> ${escapeHtml(payload.service)}` : null,
    "",
    escapeHtml(payload.message),
  ].filter((line) => line !== null);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${body}`);
  }
}
