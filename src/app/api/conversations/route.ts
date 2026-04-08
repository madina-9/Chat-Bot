let conversations = [
  { id: "1", title: "New chat" },
  { id: "2", title: "Meaning of life" },
];
let nextId = 3;

export async function GET() {
  return Response.json(conversations);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const newConv = { id: String(nextId++), title: body.title || "New chat" };
  conversations.push(newConv);
  return Response.json(newConv);
}
