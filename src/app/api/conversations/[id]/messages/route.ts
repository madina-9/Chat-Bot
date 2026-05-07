import { getMessages, createMessage } from "@/server/messages";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await getMessages(id);
  return Response.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const message = await createMessage(id, body.content, body.role);
  return Response.json(message);
}
