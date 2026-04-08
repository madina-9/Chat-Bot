"use client";

import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || disabled) return;

    onSend(input);
    setInput("");
  }

  return (
    <footer className="border-t border-[#ddd] bg-white px-8 py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex gap-4 items-end"
      >
        <input
          className={`flex-1 rounded-2xl border border-[#ddd] bg-[#f7f5ef] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          placeholder="Type a message for Felix…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
            disabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:opacity-90"
          }`}
          disabled={disabled}
        >
          {disabled ? "Wait..." : "Send"}
        </button>
      </form>
    </footer>
  );
}
