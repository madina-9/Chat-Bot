'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import type { Conversation } from '@/hooks/useConversations';

interface Props {
  initialConversations: Conversation[];
  children: React.ReactNode;
}

export default function MobileChatShell({
  initialConversations,
  children,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col md:grid md:grid-cols-12 bg-[#f7f5ef] text-black font-sans">
      {/* Mobile-only top bar — expands under the iOS notch/Dynamic Island */}
      <div
        className="md:hidden shrink-0 bg-black text-white"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex items-center h-14 px-4 gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            className="p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="font-semibold text-sm">Felix AI</span>
        </div>
      </div>

      {/* Sidebar column — desktop only */}
      <div className="hidden md:block md:col-span-3 h-full overflow-hidden">
        <Sidebar initialConversations={initialConversations} />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-10 w-[280px] h-full shadow-2xl">
            <Sidebar
              initialConversations={initialConversations}
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 min-h-0 md:col-span-9 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
