"use client";

import { useEffect, useRef, useState } from "react";
import { askQuestion, checkHealth, type Source } from "@/lib/api";
import SourceCard from "@/components/SourceCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

const EXAMPLES = [
  "What do people say about the pizza crust?",
  "Is the service good?",
  "Any complaints about delivery?",
  "Tell me about the Margherita pizza",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendReady, setBackendReady] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkHealth()
      .then((h) => setBackendReady(h.ready))
      .catch(() => setBackendReady(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleAsk(question: string) {
    const q = question.trim();

    if (!q || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: q,
      },
    ]);

    setLoading(true);

    try {
      const data = await askQuestion(q);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${
            err instanceof Error ? err.message : "Something went wrong"
          }`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col">
      <header className="mb-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  backendReady === false
                    ? "bg-red-400"
                    : backendReady === true
                      ? "bg-emerald-400"
                      : "bg-yellow-400"
                }`}
              />
              {backendReady === false
                ? "BACKEND OFFLINE"
                : backendReady === true
                  ? "AI SYSTEM READY"
                  : "CONNECTING"}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ask about pizza reviews
            </h1>

            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Search restaurant experiences using local AI and semantic
              retrieval.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:block">
            <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Powered by
            </div>
            <div className="mt-2 font-semibold text-white">
              Ollama + ChromaDB
            </div>
          </div>
        </div>

        {backendReady === false && (
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            Backend not reachable. Make sure Uvicorn is running on port 8000.
          </div>
        )}
      </header>

      <div className="flex-1">
        {messages.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-2xl text-white shadow-lg shadow-blue-500/20">
                ✦
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                What would you like to know?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask a question about the restaurant reviews and the RAG system
                will retrieve relevant reviews before generating an answer.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => handleAsk(ex)}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium leading-5 text-slate-700 group-hover:text-blue-700">
                        {ex}
                      </span>

                      <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[75%] ${
                    msg.role === "user" ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`rounded-3xl px-5 py-4 ${
                      msg.role === "user"
                        ? "rounded-br-md bg-slate-900 text-white shadow-sm"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-7">
                      {msg.content}
                    </p>
                  </div>

                  {msg.role === "assistant" &&
                    msg.sources &&
                    msg.sources.length > 0 && (
                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Retrieved Sources
                          </p>

                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                            {msg.sources.length} sources
                          </span>
                        </div>

                        <div className="space-y-2">
                          {msg.sources.map((s, j) => (
                            <SourceCard key={j} source={s} />
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {msg.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-sm font-bold text-slate-600">
                    You
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
                AI
              </div>

              <div className="rounded-3xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  </div>

                  <span className="text-sm text-slate-500">
                    Searching reviews...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div className="sticky bottom-4 z-10 mt-6">
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-xl shadow-slate-900/10 backdrop-blur">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk(input);
                }
              }}
              placeholder="Ask anything about the restaurant reviews..."
              className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              disabled={loading}
            />

            <button
              onClick={() => handleAsk(input)}
              disabled={loading || !input.trim()}
              className="flex h-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-white" />
              ) : (
                <>
                  Ask
                  <span className="ml-2">↗</span>
                </>
              )}
            </button>
          </div>

          <div className="hidden px-4 pb-1 pt-1 text-[11px] text-slate-400 sm:block">
            Press Enter to send • Answers are generated using retrieved
            restaurant reviews
          </div>
        </div>
      </div>
    </div>
  );
}