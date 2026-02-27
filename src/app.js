const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const chatWindow = document.getElementById('chatWindow');
const thinking = document.getElementById('thinking');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement('li');
  userMsg.className = 'user-message';
  userMsg.textContent = text;

  chatWindow.appendChild(userMsg);
  input.value = '';

  thinking.classList.remove('hidden');

  setTimeout(() => {
    thinking.classList.add('hidden');

    const botMsg = document.createElement('li');
    botMsg.className = 'bot-message';
    botMsg.textContent = `Felix heard: "${text}" 🐾`;

    chatWindow.appendChild(botMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1500);
});
