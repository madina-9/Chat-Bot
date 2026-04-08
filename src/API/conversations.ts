export async function getConversations(): Promise<{ id: string; title: string }[]> {
  const res = await fetch("/api/conversations");
  return res.json();
}

export async function createConversation(title?: string): Promise<{ id: string; title: string }> {
  const res = await fetch("/api/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}
