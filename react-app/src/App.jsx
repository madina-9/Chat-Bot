import { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import ChatPanel from "./components/chat/chatpanel";

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [messages, setMessages] = useState([]);

  return (
    <div className="h-screen grid grid-cols-12 bg-[#f7f5ef] text-black font-sans">
      <Sidebar
        conversations={conversations}
        setConversations={setConversations}
        activeConversationId={activeConversationId}
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