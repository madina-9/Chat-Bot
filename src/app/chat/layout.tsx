import { getConversations } from '@/server/conversations';
import MobileChatShell from '@/components/MobileChatShell';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialConversations: { id: string; title: string; createdAt: string }[] =
    [];
  try {
    const dbConversations = await getConversations();
    initialConversations = dbConversations.map((c) => ({
      id: c.id,
      title: c.title,
      createdAt: c.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error('Failed to load conversations:', err);
  }

  return (
    <MobileChatShell initialConversations={initialConversations}>
      {children}
    </MobileChatShell>
  );
}
