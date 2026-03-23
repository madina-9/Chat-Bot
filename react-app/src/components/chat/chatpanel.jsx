import { useEffect, useState } from "react";
import Message from "./message";
import MessageInput from "./messageinput";
import { getMessages, addMessage } from "../../API/messages";
import { fetchAIResponse } from "../../API/openrouter";

function ChatPanel({ messages, setMessages, activeConversationId }) {
  const [loading, setLoading] = useState(false);

  // fetch mes
  useEffect(() => {
    if (activeConversationId) {
      getMessages(activeConversationId).then(setMessages);
    }
  }, [activeConversationId]);

  // mess send
  async function handleSend(content) {
    setLoading(true);

    const userMsg = { role: "user", content };

    try {
      await addMessage(activeConversationId, userMsg);
      setMessages(prev => [...prev, userMsg]);

      const aiMsg = await fetchAIResponse([...messages, userMsg]);

      await addMessage(activeConversationId, aiMsg);
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error("Error fetching AI response:", error);

      const errorMsg = {
        role: "assistant",
        content: "Error: Could not get response."
      };

      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-3/4 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}

        {loading && <p>Purrrocessing...</p>}
      </div>

      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default ChatPanel;