import { getMessages } from "@/server/messages";
import ChatPanel from "@/components/ChatPanel";

// Server component — fetches messages from DB and passes them to the client chat
export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dbMessages = await getMessages(id);

  // Convert DB messages (content field) to the UIMessage format useChat expects (parts array)
  const initialMessages = dbMessages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: m.content }],
  }));

  return <ChatPanel conversationId={id} initialMessages={initialMessages} />;
}
