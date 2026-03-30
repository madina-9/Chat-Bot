"use client";

import { useEffect, useState, useRef } from "react";
import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import { getMessages, addMessage } from "@/API/messages";
import { fetchAIResponse } from "@/API/openrouter";

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatPanelProps {
  conversationId: string;
}

export default function ChatPanel({ conversationId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(conversationId).then(setMessages);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(content: string) {
    const userMsg: ChatMessage = { role: "user", content };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      await addMessage(conversationId, userMsg);

      const currentMessages = await getMessages(conversationId);
      const aiMsg = await fetchAIResponse(currentMessages);

      await addMessage(conversationId, aiMsg);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Error: Could not get response.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="col-span-9 flex flex-col bg-white">
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Felix AI</div>
          <div className="text-xs opacity-70">Your intelligent feline assistant</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20 transition"
          >
            Share
          </button>
          <button
            type="button"
            className="rounded-xl bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/20 transition"
          >
            Support
          </button>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto px-10 py-8 bg-[#f7f5ef]">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.map((m, i) => (
            <Message key={i} message={m} />
          ))}

          {loading && (
            <div className="w-full flex justify-start">
              <div className="text-gray-500 italic px-5 py-2 text-sm">
                purrrocessing...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </section>

      <MessageInput onSend={handleSend} disabled={loading} />
    </main>
  );
}
