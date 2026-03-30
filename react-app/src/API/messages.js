let messagesDB = {
  1: [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi! How can I help you today?" }
  ],
  2: [
    { role: "user", content: "What is the meaning of life?" },
    { role: "assistant", content: "Treats." }
  ]
};

export function getMessages(conversationId) {
  const msgs = messagesDB[conversationId] || [];
  return Promise.resolve([...msgs]); 
}

export function addMessage(conversationId, message) {
  if (!messagesDB[conversationId]) {
    messagesDB[conversationId] = [];
  }

  messagesDB[conversationId].push(message);
  return Promise.resolve({...message});
}