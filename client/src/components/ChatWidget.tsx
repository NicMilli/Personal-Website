import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage.js";
import ImageUpload from "./ImageUpload.js";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Phase = "idle" | "chatting" | "awaiting-style" | "uploading" | "done";

const GREETING = "Hi! Add an image to the floating bubbles — upload a photo or describe what you'd like. Photos of people show faces only. Type 'rules' for guidelines.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function pushMsg(role: Message["role"], content: string) {
    setMessages((prev) => [...prev, { role, content }]);
  }

  async function sendChat(text: string) {
    const history = messages.filter((m) => m.role === "assistant" || m.role === "user");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      if (data.reply) {
        pushMsg("assistant", data.reply);
      } else if (data.error) {
        pushMsg("assistant", data.error);
      }
    } catch {
      pushMsg("assistant", "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      pushMsg("assistant", "File too large (max 5MB). Please try a smaller image.");
      return;
    }
    setPendingFile(file);
    setPhase("awaiting-style");
    pushMsg("assistant", `Got it! How would you like your image styled? (e.g. 'soft pastel glow', 'high contrast', 'keep it natural')`);
  }

  async function submitImage(style: string) {
    if (!pendingFile) { return; }
    setPhase("uploading");
    setLoading(true);
    pushMsg("user", style || "natural");

    try {
      const form = new FormData();
      form.append("image", pendingFile);
      if (style) { form.append("style", style); }

      const res = await fetch("/api/bubble/image", { method: "POST", body: form });
      const data = await res.json();

      if (res.ok) {
        pushMsg("assistant", "Done! Your image will appear in the bubbles shortly. ✨");
        setPhase("done");
      } else {
        pushMsg("assistant", data.error ?? "Something went wrong. Please try again.");
        setPhase("idle");
      }
    } catch {
      pushMsg("assistant", "Upload failed. Please try again.");
      setPhase("idle");
    } finally {
      setLoading(false);
      setPendingFile(null);
    }
  }

  async function submitDescribe(description: string) {
    setLoading(true);
    pushMsg("user", description);
    try {
      const res = await fetch("/api/bubble/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (res.ok) {
        pushMsg("assistant", "Created! Your abstract art is joining the bubbles. ✨");
        setPhase("done");
      } else {
        pushMsg("assistant", data.error ?? "Something went wrong.");
        setPhase("idle");
      }
    } catch {
      pushMsg("assistant", "Request failed. Please try again.");
      setPhase("idle");
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) { return; }
    setInput("");
    pushMsg("user", text);

    if (phase === "awaiting-style") {
      await submitImage(text);
      return;
    }

    // Detect describe intent (no file pending)
    const describeKeywords = ["create", "draw", "make", "generate", "design", "galaxy", "abstract", "swirl", "pattern"];
    const isDescribe = describeKeywords.some((k) => text.toLowerCase().includes(k));
    if (isDescribe && phase === "idle") {
      await submitDescribe(text);
      return;
    }

    setPhase("chatting");
    await sendChat(text);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open image submission chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-80 flex-col rounded-2xl bg-white/90 shadow-2xl ring-1 ring-gray-200 backdrop-blur-md sm:w-96" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="rounded-t-2xl bg-gray-900 px-4 py-3">
            <p className="text-sm font-semibold text-white">Add to Bubbles</p>
            <p className="text-xs text-gray-400">Upload or describe an image</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl rounded-bl-sm bg-white/80 border border-gray-200 px-3 py-2 text-sm text-gray-400">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Image upload area — show when idle or chatting */}
          {(phase === "idle" || phase === "chatting") && (
            <div className="px-3 pb-2">
              <ImageUpload onFile={handleFile} disabled={loading} />
            </div>
          )}

          {/* Input */}
          {phase !== "done" && (
            <div className="flex gap-2 border-t border-gray-100 px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder={
                  phase === "awaiting-style"
                    ? "Describe your style preference…"
                    : "Type a description or ask a question…"
                }
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white transition-colors hover:bg-gray-700 disabled:opacity-40"
              >
                Send
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="border-t border-gray-100 px-3 py-3 text-center">
              <button
                onClick={() => {
                  setMessages([{ role: "assistant", content: GREETING }]);
                  setPhase("idle");
                }}
                className="text-xs text-gray-500 underline hover:text-gray-700"
              >
                Submit another image
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
