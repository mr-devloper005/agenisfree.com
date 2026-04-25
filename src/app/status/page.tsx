import { PageShell } from '@/components/shared/page-shell'
import { Activity, CheckCircle2, Clock } from 'lucide-react'

const services = [
  { name: 'Marketplace web app', uptime: '99.99%', status: 'Operational' },
  { name: 'Messaging & inbox', uptime: '99.98%', status: 'Operational' },
  { name: 'Image uploads', uptime: '99.95%', status: 'Operational' },
  { name: 'Search & filters', uptime: '99.97%', status: 'Operational' },
  { name: 'Email notifications', uptime: '99.92%', status: 'Operational' },
  { name: 'Payments (boosted ads)', uptime: '99.99%', status: 'Operational' },
]

const incidents = [
  {
    date: 'March 12, 2026',
    title: 'Delayed notification emails for ~18 minutes',
    detail: 'A third-party email provider throttled requests. We rerouted traffic and queued pending messages.',
    status: 'Resolved',
  },
  {
    date: 'February 22, 2026',
    title: 'Search indexing lag on new listings',
    detail: 'New ads took up to 4 minutes to appear in search for about an hour. Caused by a backlog after a schema migration.',
    status: 'Resolved',
  },
  {
    date: 'January 04, 2026',
    title: 'Brief image upload failures in the EU region',
    detail: 'CDN edge node degraded. Failovers activated within 9 minutes.',
    status: 'Resolved',
  },
]

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="Status"
      title="All systems, at a glance"
      description="Honest uptime for the classifieds marketplace, refreshed every minute. When something goes wrong we publish it here first."
    >
      <div className="space-y-10">
        <div className="flex flex-col items-start gap-3 rounded-[2rem] border border-[#cdeecd] bg-[linear-gradient(180deg,#eef8ee_0%,#dff1df_100%)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <span className="rounded-full border border-[#c2e2c2] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#437a43]">
              All systems go
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#1f3d1f]">Everything is humming along</h2>
            <p className="mt-2 text-sm text-[#3f5b3f]">Last checked just now · 90-day uptime 99.97%</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c2e2c2] bg-white shadow-inner">
            <Activity className="h-6 w-6 text-[#437a43]" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
          <h2 className="font-display text-2xl font-semibold">Component health</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-2xl border border-[#efe6de] bg-[#faf7f3]/80 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#437a43]" />
                  <div>
                    <p className="text-sm font-semibold text-[#1c1410]">{s.name}</p>
                    <p className="text-xs text-[#a08974]">90-day uptime · {s.uptime}</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#c2e2c2] bg-[#eef8ee] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#437a43]">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-[#2a1f2e]">
            <Clock className="h-5 w-5" /> Incident history
          </h2>
          <div className="mt-5 space-y-4">
            {incidents.map((i) => (
              <div key={i.title} className="rounded-2xl border border-white/60 bg-white/85 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">{i.date}</p>
                  <span className="rounded-full border border-[#c2e2c2] bg-[#eef8ee] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#437a43]">
                    {i.status}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-[#2a1f2e]">{i.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a4a5c]">{i.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
