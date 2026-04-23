import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Code2, Key, Rss, Webhook } from 'lucide-react'

const endpoints = [
  { method: 'GET', path: '/v1/classifieds', description: 'List classifieds with filters for city, category, price range, and keyword.' },
  { method: 'GET', path: '/v1/classifieds/:slug', description: 'Fetch a single classified with seller, photos, and price history.' },
  { method: 'POST', path: '/v1/classifieds', description: 'Create a classified on behalf of an authenticated seller account.' },
  { method: 'GET', path: '/v1/categories', description: 'List all categories and their localized labels.' },
  { method: 'GET', path: '/v1/sellers/:id', description: 'Public seller profile with aggregate reputation (no PII).' },
]

const capabilities = [
  {
    icon: Key,
    title: 'Simple auth',
    body: 'Personal access tokens scoped to your seller account. No OAuth dance for read-only exports.',
  },
  {
    icon: Webhook,
    title: 'Webhooks you trust',
    body: 'Signed payloads, retries with exponential backoff, and a replay console so you never lose an event.',
  },
  {
    icon: Rss,
    title: 'Real-time feeds',
    body: 'Subscribe to city or category feeds over HTTP streaming for dashboards and analytics tools.',
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      eyebrow="Developers"
      title="Build on the classifieds marketplace"
      description="A small, stable REST surface that mirrors the site. Useful for personal tools, city dashboards, or partner integrations."
      actions={
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          Request API access →
        </Link>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-5 md:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                <c.icon className="h-4 w-4 text-[#7c6aa8]" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5348]">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Code2 className="h-5 w-5 text-[#7c6aa8]" /> Endpoints we publish today
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#efe6de]">
            <table className="w-full text-sm">
              <thead className="bg-[#faf4ec] text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                <tr>
                  <th className="px-5 py-3">Method</th>
                  <th className="px-5 py-3">Path</th>
                  <th className="px-5 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="bg-[#fffdfb] text-[#1c1410]">
                {endpoints.map((e) => (
                  <tr key={`${e.method} ${e.path}`} className="border-t border-[#efe6de]">
                    <td className="px-5 py-4 font-mono text-xs font-semibold text-[#7c6aa8]">{e.method}</td>
                    <td className="px-5 py-4 font-mono text-xs">{e.path}</td>
                    <td className="px-5 py-4 text-[#6b5348]">{e.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-[#2a1f2e]">A minimal fetch</h2>
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/60 bg-[#1c1410] p-5 text-xs leading-7 text-[#f4ece1]">
{`curl https://api.agenisfree.com/v1/classifieds \\
  -H "Authorization: Bearer $TOKEN" \\
  -G --data-urlencode "city=Lisbon" \\
     --data-urlencode "category=furniture"`}
          </pre>
        </div>
      </div>
    </PageShell>
  )
}
