const messagesDB: Record<string, { role: string; content: string }[]> = {
  "1": [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi! How can I help you today?" },
  ],
  "2": [
    { role: "user", content: "What is the meaning of life?" },
    { role: "assistant", content: "Treats." },
  ],
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return Response.json(messagesDB[id] || []);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const message = await request.json();
  if (!messagesDB[id]) messagesDB[id] = [];
  messagesDB[id].push(message);
  return Response.json(message);
}
