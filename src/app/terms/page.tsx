import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { BookOpen, Gavel, AlertTriangle, Handshake } from 'lucide-react'

const rules = [
  {
    icon: BookOpen,
    title: 'What you can post',
    points: [
      'Goods and services you legally own or represent',
      'Original photographs and honest descriptions',
      'Pricing, condition, and location details buyers can verify',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'What is off-limits',
    points: [
      'Weapons, controlled substances, counterfeit items',
      'Adult content, harassment, or hateful language',
      'Fake ads designed to collect buyer contact info',
    ],
  },
  {
    icon: Handshake,
    title: 'Buyer–seller conduct',
    points: [
      'Keep initial conversations on-platform',
      'Meet in public places and bring a friend for high-value items',
      'Report suspicious behavior so moderators can act quickly',
    ],
  },
  {
    icon: Gavel,
    title: 'Moderation and appeals',
    points: [
      'We remove listings that violate these rules and notify the author',
      'Repeat offenders lose posting privileges',
      'You can appeal any action via support within seven days',
    ],
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="A classifieds agreement you can read in one sitting"
      description={`By using ${SITE_CONFIG.name} you accept these terms. We keep them short, fair, and focused on the behaviors that make a marketplace feel trustworthy.`}
    >
      <div className="space-y-10">
        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">Last updated · March 16, 2026</p>
          <h2 className="mt-4 font-display text-2xl font-semibold">The short version</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#6b5348]">
            Be honest in your ads, respectful in your messages, and careful with other people’s time. We will do our part with clear tools,
            consistent moderation, and a warm design that keeps things pleasant. If a real dispute arises we will help mediate, but ultimately
            transactions happen between buyer and seller.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {rules.map((rule) => (
            <div key={rule.title} className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                  <rule.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <h3 className="font-display text-xl font-semibold">{rule.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[#6b5348]">
                {rule.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c6aa8]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-[#2a1f2e]">Liability &amp; changes</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#5a4a5c]">
            We provide the marketplace “as is” without warranty of buyer or seller behavior. If we update these terms materially, we will email
            active users at least 14 days before the change takes effect, and continued use means you accept the new version.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
