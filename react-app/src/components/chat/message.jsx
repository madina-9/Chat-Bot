function Message({ message }) {
  const isUser = message.role === "user";
  
  return (
    <div className={isUser ? "text-right" : "text-left"}>
      <p className={`inline-block p-2 m-1 rounded ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
        {message.content}
      </p>
    </div>
  );
}

export default Message;