function Message({ message }) {
  const isUser = message.role === "user";
  const name = isUser ? "You" : "Felix AI";
  
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        <div className={`mb-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
          <span className="font-semibold text-black">{name}</span>
        </div>

        <div className={`rounded-2xl px-5 py-3 ${
          isUser ? 'bg-black text-white' : 'bg-[#efefef] text-black'
        }`}>
          <div className="leading-relaxed">{message.content}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;