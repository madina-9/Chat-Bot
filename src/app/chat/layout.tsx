import { getConversations } from '@/server/conversations';
import MobileChatShell from '@/components/MobileChatShell';

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dbConversations = await getConversations();
  const initialConversations = dbConversations.map((c) => ({
    id: c.id,
    title: c.title,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <MobileChatShell initialConversations={initialConversations}>
      {children}
    </MobileChatShell>
  );
}
