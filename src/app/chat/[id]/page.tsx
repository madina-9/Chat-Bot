import { getMessages } from '@/server/messages';
import ChatPanel from '@/components/ChatPanel';

// Server component — fetches messages from DB and passes them to the client chat
export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let initialMessages: {
    id: string;
    role: 'user' | 'assistant';
    parts: { type: 'text'; text: string }[];
  }[] = [];
  try {
    const dbMessages = await getMessages(id);
    initialMessages = dbMessages.map((m) => ({
      id: m.id,
      role: m.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: m.content }],
    }));
  } catch (err) {
    console.error('Failed to load messages:', err);
  }

  return <ChatPanel conversationId={id} initialMessages={initialMessages} />;
}
