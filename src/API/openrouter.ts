export async function fetchAIResponse(
  messages: { role: string; content: string }[]
): Promise<{ role: string; content: string }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch AI response");
  }

  return data;
}
