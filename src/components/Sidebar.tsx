"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getConversations, createConversation } from "@/API/conversations";

interface Conversation {
  id: string;
  title: string;
}

export default function Sidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  async function handleNewChat() {
    const newConv = await createConversation("New chat");
    setConversations((prev) => [...prev, newConv]);
    router.push(`/chat/${newConv.id}`);
  }

  return (
    <aside className="col-span-3 bg-white border-r border-[#ddd] flex flex-col">
      <div className="p-5">
        <button
          onClick={handleNewChat}
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
            <button
              key={c.id}
              onClick={() => router.push(`/chat/${c.id}`)}
              className={`w-full text-left rounded-2xl px-4 py-3 transition ${
                isActive
                  ? "bg-[#efefef] border border-[#ddd]"
                  : "hover:bg-[#f2f2f2] border border-transparent"
              }`}
            >
              <div className="font-semibold">{c.title}</div>
              {isActive && <div className="text-xs text-gray-500">Active</div>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-[#ddd] p-5">
        <div className="text-sm font-semibold">My Companion</div>
      </div>
    </aside>
  );
}
