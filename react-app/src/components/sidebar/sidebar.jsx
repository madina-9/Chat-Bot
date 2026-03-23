import { useEffect } from "react";
import { getConversations } from "../../API/conversations";

function Sidebar({ conversations, setConversations, activeConversationId, setActiveConversationId }) {
  useEffect(() => {
    getConversations().then(setConversations);
  }, []);

  return (
    <aside className="col-span-3 bg-white border-r border-[#ddd] flex flex-col">
      <div className="p-5">
        <button className="w-full rounded-2xl bg-black text-white py-3 text-sm font-semibold shadow-sm hover:opacity-90 transition">
          + New Chat
        </button>
      </div>

      <div className="px-5 pb-3 text-xs uppercase tracking-wider text-gray-500">
        Our memories
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {conversations.map((c) => {
          const isActive = c.id === activeConversationId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveConversationId(c.id)}
              className={`w-full text-left rounded-2xl px-4 py-3 transition ${
                isActive 
                  ? "bg-[#efefef] border border-[#ddd]" 
                  : "hover:bg-[#f2f2f2] border border-transparent"
              }`}
            >
              <div className="font-semibold">{c.title}</div>
              {isActive && <div className="text-xs text-gray-500">Active</div>}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-[#ddd] p-5">
        <div className="text-sm font-semibold">My Companion</div>
      </div>
    </aside>
  );
}

export default Sidebar;