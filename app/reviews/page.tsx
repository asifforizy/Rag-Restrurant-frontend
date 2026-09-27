"use client";

import { useEffect, useState } from "react";

interface Review {
  Title: string;
  Date: string;
  Rating: number;
  Review: string;
}

function parseCSV(text: string): Review[] {
  const lines = text.split("\n").filter((l) => l.trim());
  const headers = splitCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = splitCSVLine(line);
    const row: Record<string, string> = {};

    headers.forEach((h, i) => (row[h] = values[i]));

    return {
      Title: row.Title,
      Date: row.Date,
      Rating: parseInt(row.Rating, 10),
      Review: row.Review,
    };
  });
}

function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<number | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/realistic_restaurant_reviews.csv")
      .then((r) => r.text())
      .then((text) => setReviews(parseCSV(text)));
  }, []);

  const filtered = reviews.filter((r) => {
    const matchesRating = filter === "all" || r.Rating === filter;

    const matchesSearch =
      !search ||
      r.Title.toLowerCase().includes(search.toLowerCase()) ||
      r.Review.toLowerCase().includes(search.toLowerCase());

    return matchesRating && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 p-8 text-white shadow-xl">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            REVIEW DATASET
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            All Reviews
          </h1>

          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Explore the restaurant review dataset used by the RAG system.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-lg font-bold">{reviews.length}</span>
              <span className="ml-2 text-sm text-slate-400">Total reviews</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-lg font-bold">{filtered.length}</span>
              <span className="ml-2 text-sm text-slate-400">Showing</span>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by title or review content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", 5, 4, 3, 2, 1] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === r
                    ? "bg-slate-900 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {r === "all" ? "All" : `${r} ★`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🔎
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No reviews found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or rating filter.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((review, i) => (
          <article
            key={i}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-bold text-slate-900">
                  {review.Title}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {review.Date}
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                {"★".repeat(review.Rating)}
              </div>
            </div>

            <div className="my-5 h-px bg-slate-100" />

            <p className="text-sm leading-7 text-slate-600">
              {review.Review}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Restaurant Review
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                {review.Rating}/5
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}