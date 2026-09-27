import type { Source } from "@/lib/api";

export default function SourceCard({ source }: { source: Source }) {
  return (
    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-4 text-sm shadow-sm">
      <p className="mb-1 text-xs text-gray-500">
        ⭐ {source.rating ?? "?"}/5 · 📅 {source.date ?? "unknown"}
      </p>
      <p className="text-gray-700 leading-relaxed">{source.content}</p>
    </div>
  );
}