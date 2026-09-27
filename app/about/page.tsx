export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-xl">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            LOCAL AI • RAG SYSTEM
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About this project
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            A local Retrieval-Augmented Generation system for exploring
            restaurant reviews using semantic search and a locally running LLM.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              ChromaDB
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Ollama
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              FastAPI
            </div>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
              🧠
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                How it works
              </h2>
              <p className="text-sm text-slate-500">
                From raw reviews to AI-generated answers
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-200 hover:bg-blue-50/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                  01
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Indexing
                </span>
              </div>

              <h3 className="font-semibold text-slate-900">
                Process the reviews
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Reviews from the CSV dataset are split into documents and
                converted into vector embeddings using{" "}
                <code className="rounded-md bg-slate-200 px-1.5 py-0.5 text-xs font-medium text-slate-800">
                  mxbai-embed-large
                </code>
                .
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-violet-200 hover:bg-violet-50/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
                  02
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                  Storage
                </span>
              </div>

              <h3 className="font-semibold text-slate-900">
                Store vector embeddings
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generated embeddings are persisted locally in{" "}
                <strong className="text-slate-800">ChromaDB</strong> so they
                can be efficiently searched later.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-emerald-200 hover:bg-emerald-50/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
                  03
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Retrieval
                </span>
              </div>

              <h3 className="font-semibold text-slate-900">
                Find relevant reviews
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                When a question is submitted, the system retrieves the
                top-k semantically similar reviews from ChromaDB.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-orange-200 hover:bg-orange-50/40">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white">
                  04
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                  Generation
                </span>
              </div>

              <h3 className="font-semibold text-slate-900">
                Generate the answer
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Retrieved reviews are provided as context to{" "}
                <code className="rounded-md bg-slate-200 px-1.5 py-0.5 text-xs font-medium text-slate-800">
                  llama3.2
                </code>{" "}
                running locally through <strong>Ollama</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
              🛠️
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tech Stack</h2>
              <p className="text-sm text-slate-500">
                Technologies powering the application
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {[
            {
              title: "Backend",
              value: "FastAPI · LangChain · ChromaDB",
              icon: "⚡",
              color: "blue",
            },
            {
              title: "LLM / Embeddings",
              value: "Ollama · llama3.2:3b · mxbai-embed-large",
              icon: "🤖",
              color: "violet",
            },
            {
              title: "Frontend",
              value: "Next.js · TypeScript · Tailwind",
              icon: "◈",
              color: "emerald",
            },
            {
              title: "Data",
              value: "CSV of real restaurant reviews",
              icon: "📊",
              color: "orange",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                  {item.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
              📡
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                API Endpoints
              </h2>
              <p className="text-sm text-slate-500">
                Available backend routes
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
            <span className="w-fit rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              GET
            </span>
            <code className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
              /health
            </code>
            <span className="text-sm text-slate-500">
              Is the pipeline ready?
            </span>
          </div>

          <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
            <span className="w-fit rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
              POST
            </span>
            <code className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
              /query
            </code>
            <span className="text-sm text-slate-500">
              Ask a question about the reviews
            </span>
          </div>

          <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
            <span className="w-fit rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
              GET
            </span>
            <code className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
              /reviews
            </code>
            <span className="text-sm text-slate-500">
              List all reviews, if available
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}