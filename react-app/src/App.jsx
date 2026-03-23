import { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import ChatPanel from "./components/chat/chatpanel";

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex h-screen">
      <Sidebar
        conversations={conversations}
        setConversations={setConversations}
        setActiveConversationId={setActiveConversationId}
      />

      <ChatPanel
        messages={messages}
        setMessages={setMessages}
        activeConversationId={activeConversationId}
      />
    </div>
  );
}

export default App;