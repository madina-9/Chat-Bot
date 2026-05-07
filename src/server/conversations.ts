import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getConversations() {
  return prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createConversation(title: string) {
  const conversation = await prisma.conversation.create({
    data: { title },
  });
  revalidatePath("/chat", "layout");
  return conversation;
}

export async function deleteConversation(id: string) {
  await prisma.message.deleteMany({ where: { conversationId: id } });
  const conversation = await prisma.conversation.delete({ where: { id } });
  revalidatePath("/chat", "layout");
  return conversation;
}
