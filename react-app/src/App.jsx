import { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import ChatPanel from "./components/chat/chatpanel";

function App() {
  const [messages, setMessages] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setActiveConversationId={setActiveConversationId} />
      <ChatPanel
        messages={messages}
        setMessages={setMessages}
        activeConversationId={activeConversationId}
      />
    </div>
  );
}

export default App;