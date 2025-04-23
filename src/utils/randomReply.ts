
const REPLY_MESSAGES = [
  "Thanks for reaching out!",
  "👋 Got your message! How can I assist?",
  "Appreciate your message – I'll get back soon.",
  "😊 Your message was received!",
  "Noted! I'll reply soon.",
  "Thank you! I'm on it.",
  "👍 Got it. Chat soon.",
  "Great to hear from you!",
  "I'll get back to you shortly.",
  "Message received, thanks!"
];

export function getRandomReplyMessage() {
  const idx = Math.floor(Math.random() * REPLY_MESSAGES.length);
  return REPLY_MESSAGES[idx];
}
