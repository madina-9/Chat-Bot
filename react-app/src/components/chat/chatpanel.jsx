import Message from "./message";
import MessageInput from "./messageinput";

function ChatPanel({ messages, setMessages }) {

  function handleSend(content) {
    const newMsg = { role: "user", content };
    setMessages([...messages, newMsg]);
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="flex-1 p-4">
        {messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}

export default ChatPanel;