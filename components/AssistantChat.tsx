"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

type Status = "idle" | "sending" | "error";

const SUGGESTED: string[] = [
  "Who is Santiago Vittor and what does he do?",
  "Which projects are most relevant for frontend roles?",
  "How can I get in touch with Santiago?"
];

export default function AssistantChat() {
  const { isDark } = useTheme();

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi, I can answer questions about my portfolio projects (stack, tradeoffs, links). What would you like to know?",
    },
  ]);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep the scroll at the bottom after each new message
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const containerClass = isDark ? "assistantContainer__isDark" : "assistantContainer";
  const surfaceClass = isDark ? "assistantSurface assistantSurface--isDark" : "assistantSurface";

  const canSend = useMemo(() => {
    const text = input.trim();
    return text.length >= 2 && text.length <= 800 && status !== "sending";
  }, [input, status]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setStatus("sending");
    setErrorMsg("");

    const nextMessages: ChatMsg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await res.json().catch(() => ({}))) as any;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: String(data.reply || "") }]);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    void send(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send (Shift+Enter for newline)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) void send(input);
    }
  };

  const onSuggested = (q: string) => {
    setInput(q);
  };

  const onClear = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. Ask me anything about the projects showcased in this portfolio.",
      },
    ]);
    setInput("");
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <div className={containerClass}>
      <div className="assistantContainer__content" data-aos="fade">
        <h1>ASSISTANT</h1>

        <h4>
          Ask about my projects, stack choices, and tradeoffs. For anything else, you can
          always email me at{" "}
          <a className="assistantLink" href="mailto:svittordev@gmail.com">
            svittordev@gmail.com
          </a>
          .
        </h4>

        <div className={surfaceClass}>
          <div className="assistantTopRow">
            <div className="assistantTopRow__title">Suggested</div>
            <button type="button" className="assistantTopRow__clear" onClick={onClear}>
              Clear chat
            </button>
          </div>

          <div className="assistantChips">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                type="button"
                className="assistantChip"
                onClick={() => onSuggested(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="assistantHairline" />

          <div ref={listRef} className="assistantMessages" aria-live="polite">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={m.role === "user" ? "assistantMsg assistantMsg--user" : "assistantMsg"}
              >
                <div className="assistantMsg__bubble">{m.content}</div>
              </div>
            ))}
          </div>

          <div className="assistantHairline" />

          <form onSubmit={onSubmit} className="assistantComposer">
            <label className="assistantComposer__label" htmlFor="assistantInput">
              Your message
            </label>

            <textarea
              id="assistantInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about a project, tech stack, or decisions..."
              maxLength={800}
            />

            <button
              className={canSend ? "assistantButton" : "assistantButton assistantButton--disabled"}
              type="submit"
              disabled={!canSend}
            >
              {status === "sending" ? "Thinking..." : "Send"}
            </button>

            {status === "error" ? (
              <div className="assistantAlert assistantAlert--error">{errorMsg}</div>
            ) : null}

            <div className="assistantHint">
              Tip: Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for a new line.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
