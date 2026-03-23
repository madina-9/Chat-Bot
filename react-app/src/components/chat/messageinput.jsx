import { useState } from "react";

function MessageInput({ onSend, disabled }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || disabled) return; // prevent empty sends or double sends

    onSend(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex p-4">
      <input
        className="flex-1 border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled} 
      />
      <button 
        type="submit" 
        className={`ml-2 px-4 text-white ${disabled ? 'bg-gray-400' : 'bg-blue-500'}`}
        disabled={disabled} 
      >
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}

export default MessageInput;