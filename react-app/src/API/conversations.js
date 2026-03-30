let conversations = [
  { id: 1, title: "New chat" },
  { id: 2, title: "Meaning of life" }
];

export function getConversations() {
  return Promise.resolve(conversations);
}