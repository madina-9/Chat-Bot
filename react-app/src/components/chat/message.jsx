function Message({ message }) {
  return (
    <div className={message.role === "user" ? "text-right" : "text-left"}>
      <p className="bg-gray-300 inline-block p-2 m-1 rounded">
        {message.content}
      </p>
    </div>
  );
}

export default Message;