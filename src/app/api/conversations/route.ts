import { prisma } from "@/lib/prisma";

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(conversations);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const conversation = await prisma.conversation.create({
    data: { title: body.title || "New chat" },
  });
  return Response.json(conversation);
}
