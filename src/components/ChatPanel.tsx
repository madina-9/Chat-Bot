'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';

interface ChatPanelProps {
  conversationId: string;
  initialMessages: UIMessage[];
}

export default function ChatPanel({
  conversationId,
  initialMessages,
}: ChatPanelProps) {
  // useChat handles streaming tokens, optimistic user messages, and abort on
  // navigation — no manual SSE parsing or state management needed.
  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  // "submitted" = waiting for first token; "streaming" = tokens arriving
  const isPending = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend(text: string) {
    let pushSubscription: unknown;
    try {
      const raw = localStorage.getItem('pushSub');
      if (raw) pushSubscription = JSON.parse(raw);
    } catch {}
    sendMessage({ text }, { body: { conversationId, pushSubscription } });
  }

  return (
    <main className="col-span-9 flex flex-col bg-white">
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Felix AI</div>
          <div className="text-xs opacity-70">
            Your intelligent feline assistant
          </div>
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
          {messages.map((m) => {
            // UIMessage uses a parts array; extract the text part for display
            const textPart = m.parts.find(
              (p): p is { type: 'text'; text: string } => p.type === 'text',
            );
            return (
              <Message
                key={m.id}
                message={{ role: m.role, content: textPart?.text ?? '' }}
              />
            );
          })}

          {/* Show typing indicator while waiting for the first token */}
          {status === 'submitted' && (
            <div className="w-full flex justify-start">
              <div className="text-gray-500 italic px-5 py-2 text-sm">
                purrrocessing...
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm px-5">
              Failed to send message. Please try again.
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </section>

      <MessageInput onSend={handleSend} disabled={isPending} />
    </main>
  );
}
