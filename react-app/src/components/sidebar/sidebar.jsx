import { useEffect } from "react";
import { getConversations } from "../../API/conversations";

function Sidebar({ conversations, setConversations, setActiveConversationId }) {

  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="font-bold mb-2">Conversations</h2>

      {conversations.map((c) => (
        <div
          key={c.id}
          onClick={() => setActiveConversationId(c.id)}
          className="p-2 cursor-pointer hover:bg-gray-300"
        >
          {c.title}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;