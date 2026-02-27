document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("messageInput");
    const messageList = document.getElementById("messageList");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const messageText = input.value.trim();
      if (messageText === "") return;
  
      const messageItem = document.createElement("li");
      messageItem.classList.add("message", "user");
  
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.textContent = messageText;
  
      messageItem.appendChild(bubble);
      messageList.appendChild(messageItem);
  
      input.value = "";
      messageList.scrollTop = messageList.scrollHeight;
    });
  });