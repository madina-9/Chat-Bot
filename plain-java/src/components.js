class FelixChat extends HTMLElement {
  connectedCallback() {
    const from = (this.getAttribute('from') || 'ai').toLowerCase();
    const name =
      this.getAttribute('name') || (from === 'user' ? 'You' : 'Felix');
    const time = this.getAttribute('time') || '';

    const originalText = (this.textContent || '').trim();
    const isUser = from === 'user';

    this.innerHTML = `
      <div class="w-full flex ${isUser ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%]">

          <div class="mb-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}">
            <span class="font-semibold text-black">${name}</span>
            ${time ? `<span class="mx-2 text-gray-400">•</span><span>${time}</span>` : ''}
          </div>

          <div class="rounded-2xl px-5 py-3 ${
            isUser ? 'bg-black text-white' : 'bg-[#efefef] text-black'
          }">
            <div class="leading-relaxed">${this._escapeHtml(originalText)}</div>
          </div>

        </div>
      </div>
    `;
  }

  _escapeHtml(str) {
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}

customElements.define('felix-chat', FelixChat);
