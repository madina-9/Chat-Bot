import { deleteConversation } from "@/server/conversations";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteConversation(id);
  return Response.json({ ok: true });
}
