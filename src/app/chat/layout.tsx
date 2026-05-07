import { getConversations } from "@/server/conversations";
import Sidebar from "@/components/Sidebar";

// Server component — fetches conversations from DB directly, no client-side fetch
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dbConversations = await getConversations();
  // Serialize Dates to strings before passing to the client component
  const initialConversations = dbConversations.map((c) => ({
    id: c.id,
    title: c.title,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div className="h-screen grid grid-cols-12 bg-[#f7f5ef] text-black font-sans">
      <Sidebar initialConversations={initialConversations} />
      {children}
    </div>
  );
}
