import { useState } from "react";

function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    onSend(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex p-4">
      <input
        className="flex-1 border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="ml-2 bg-blue-500 text-white px-4">
        Send
      </button>
    </form>
  );
}

export default MessageInput;