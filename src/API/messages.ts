export async function getMessages(conversationId: string): Promise<{ role: string; content: string }[]> {
  const res = await fetch(`/api/conversations/${conversationId}/messages`);
  return res.json();
}

export async function addMessage(
  conversationId: string,
  message: { role: string; content: string }
): Promise<{ role: string; content: string }> {
  const res = await fetch(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  return res.json();
}
