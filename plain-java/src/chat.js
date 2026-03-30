const container = document.getElementById('messages-container');

export function appendUserMessage(text) {
  const el = document.createElement('felix-chat');
  el.setAttribute('from', 'user');
  el.textContent = text;
  container.appendChild(el);
  scrollToBottom();
}

export function createAssistantBubble() {
  const wrapper = document.createElement('div');
  wrapper.className = 'w-full flex justify-start';
  wrapper.innerHTML = `
    <div class="max-w-[80%]">
      <div class="mb-1 text-xs text-gray-500 text-left">
        <span class="font-semibold text-black">Felix</span>
      </div>
      <div class="rounded-2xl px-5 py-3 bg-[#efefef] text-black">
        <div class="leading-relaxed"></div>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
  scrollToBottom();
  return wrapper.querySelector('.leading-relaxed');
}

export function scrollToBottom() {
  container.parentElement.scrollTop = container.parentElement.scrollHeight;
}
