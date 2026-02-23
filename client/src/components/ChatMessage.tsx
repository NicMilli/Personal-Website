interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug ${
          isUser
            ? "bg-gray-900 text-white rounded-br-sm"
            : "bg-white/80 text-gray-800 border border-gray-200 rounded-bl-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
