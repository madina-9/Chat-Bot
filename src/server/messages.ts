import { prisma } from "@/lib/prisma";

export async function getMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}

export async function createMessage(
  conversationId: string,
  content: string,
  role: string
) {
  return prisma.message.create({
    data: { role, content, conversationId },
  });
}
