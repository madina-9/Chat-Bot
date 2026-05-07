'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  useConversations,
  useCreateConversation,
  useDeleteConversation,
  type Conversation,
} from '@/hooks/useConversations';

interface SidebarProps {
  initialConversations: Conversation[];
  onNavigate?: () => void;
}

export default function Sidebar({
  initialConversations,
  onNavigate,
}: SidebarProps) {
  // initialConversations is server-fetched data passed in on first render.
  // useConversations seeds the TanStack cache with it so there is no loading
  // spinner on first paint; mutations then update the cache optimistically.
  const { data: conversations = [] } = useConversations(initialConversations);
  const { mutate: createConversation } = useCreateConversation();
  const { mutate: deleteConversation } = useDeleteConversation();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="h-full bg-white border-r border-[#ddd] flex flex-col">
      <div className="p-5">
        <button
          onClick={() => {
            createConversation('New chat');
            onNavigate?.();
          }}
          className="w-full rounded-2xl bg-black text-white py-3 text-sm font-semibold shadow-sm hover:opacity-90 transition"
        >
          + New Chat
        </button>
      </div>

      <div className="px-5 pb-3 text-xs uppercase tracking-wider text-gray-500">
        Our memories
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {conversations.map((c) => {
          const isActive = pathname === `/chat/${c.id}`;
          return (
            <div key={c.id} className="flex items-center gap-1">
              <button
                onClick={() => {
                  router.push(`/chat/${c.id}`);
                  onNavigate?.();
                }}
                className={`flex-1 text-left rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? 'bg-[#efefef] border border-[#ddd]'
                    : 'hover:bg-[#f2f2f2] border border-transparent'
                }`}
              >
                <div className="font-semibold">{c.title}</div>
                {isActive && (
                  <div className="text-xs text-gray-500">Active</div>
                )}
              </button>
              <button
                onClick={() => deleteConversation(c.id)}
                className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition text-sm leading-none"
                title="Delete conversation"
              >
                ×
              </button>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-[#ddd] p-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/cat.jpg"
            alt="My Companion"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 15%' }}
          />
        </div>
        <div className="text-sm font-semibold">My Companion</div>
      </div>
    </aside>
  );
}
