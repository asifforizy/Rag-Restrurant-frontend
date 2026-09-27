// lib/api.ts
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Source {
  rating: number | string | null;
  date: string | null;
  content: string;
}

export interface QueryResponse {
  question: string;
  answer: string;
  sources: Source[];
}

export async function askQuestion(question: string): Promise<QueryResponse> {
  const res = await fetch(`${API_URL}/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Error ${res.status}`);
  }

  return res.json();
}

export async function checkHealth(): Promise<{ status: string; ready: boolean }> {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error("Backend unreachable");
  return res.json();
}