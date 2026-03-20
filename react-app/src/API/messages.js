let messagesDB = {
  1: [{ role: "user", content: "Hello" }],
  2: [{ role: "user", content: "Hi" }]
};

export function getMessages(id) {
  return Promise.resolve(messagesDB[id] || []);
}
