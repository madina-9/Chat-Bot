let conversations = [
  { id: 1, title: "Chat 1" },
  { id: 2, title: "Chat 2" }
];

export function getConversations() {
  return Promise.resolve(conversations);
}