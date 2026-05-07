import {
  getConversations,
  createConversation,
} from "@/server/conversations";

export async function GET() {
  const data = await getConversations();
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const conv = await createConversation(body.title || "New chat");
  return Response.json(conv);
}
