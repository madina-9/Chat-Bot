import './components.js';
import { streamChat } from './api.js';
import {
  appendUserMessage,
  createAssistantBubble,
  scrollToBottom,
} from './chat.js';

const messages = [];
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await sendMessage();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.disabled = true;

  appendUserMessage(text);
  messages.push({ role: 'user', content: text });

  const contentEl = createAssistantBubble();
  let fullReply = '';

  try {
    fullReply = await streamChat(messages, (delta) => {
      fullReply += delta;
      contentEl.textContent = fullReply;
      scrollToBottom();
    });
  } catch (err) {
    contentEl.textContent = `Error: ${err.message}`;
  } finally {
    input.disabled = false;
    input.focus();
  }

  if (fullReply) {
    messages.push({ role: 'assistant', content: fullReply });
  }
}
