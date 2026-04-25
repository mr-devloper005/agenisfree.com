import { PageShell } from '@/components/shared/page-shell'
import { Cookie, ShieldCheck, Settings as SettingsIcon, PieChart } from 'lucide-react'

const types = [
  {
    icon: ShieldCheck,
    title: 'Essential',
    state: 'Always on',
    body: 'Keeps you signed in, remembers your cart-style drafts, and guards against automated abuse of forms.',
  },
  {
    icon: SettingsIcon,
    title: 'Preferences',
    state: 'On by default',
    body: 'Stores your last-used category filters, location, and theme so the site opens where you left off.',
  },
  {
    icon: PieChart,
    title: 'Analytics',
    state: 'Opt out anytime',
    body: 'Aggregate data on which categories are popular and which pages load slowly. No personal profiling.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Cookies"
      title="Small files, clear purpose"
      description="We use cookies sparingly—only where they make the marketplace faster or safer. Here is every category we set and how to switch them off."
    >
      <div className="space-y-10">
        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ddd4] bg-[#faf4ec]">
              <Cookie className="h-5 w-5 text-[#7c6aa8]" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">Updated March 16, 2026</p>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-8 text-[#6b5348]">
            No third-party ad networks, no behavioral retargeting, no data sold to partners. The handful of cookies below exist purely to make
            browsing classifieds smoother for you.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {types.map((t) => (
            <div key={t.title} className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                  <t.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                  {t.state}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5348]">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-[#2a1f2e]">Manage in one tap</h2>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-[#5a4a5c]">
            You can toggle analytics from your browser’s Do Not Track header, or clear all site data via Settings → Privacy. The site keeps
            working either way—just with a touch less tailoring.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
