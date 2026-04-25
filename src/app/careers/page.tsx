import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import { Briefcase, Globe2, HeartHandshake, Sparkles } from 'lucide-react'

const roles = [
  {
    title: 'Senior product designer',
    team: 'Design',
    location: 'Remote · Europe friendly',
    summary: 'Shape the seller flow from first listing to completed sale. Sketching, prototyping, and shipping weekly.',
  },
  {
    title: 'Marketplace operations specialist',
    team: 'Trust & safety',
    location: 'Lisbon or remote',
    summary: 'Run the moderator playbook, investigate edge cases, and turn patterns into better policies.',
  },
  {
    title: 'Full-stack engineer',
    team: 'Engineering',
    location: 'Remote · Americas friendly',
    summary: 'Next.js, TypeScript, and a calm test pyramid. Build the features you would want in your own weekend market app.',
  },
  {
    title: 'City lead, São Paulo',
    team: 'Community',
    location: 'São Paulo, on-the-ground',
    summary: 'Host seller circles, partner with local fairs, and be the marketplace’s friendly face in the neighborhood.',
  },
]

const benefits = [
  {
    icon: Globe2,
    title: 'Remote-first, thoughtfully',
    body: 'Quarterly in-person weeks funded by us. Overlap hours kept sane so nobody burns midnight oil.',
  },
  {
    icon: HeartHandshake,
    title: 'Care that matches the work',
    body: 'Health, dental, and therapy reimbursements. Generous parental leave for every path to family.',
  },
  {
    icon: Sparkles,
    title: 'A craft stipend',
    body: 'Books, workshops, conferences, or a new lens. €1,200 a year for the things that keep you curious.',
  },
  {
    icon: Briefcase,
    title: 'Meaningful ownership',
    body: 'Transparent salary bands plus equity. We share what we earn—no mysterious bonus formulas.',
  },
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build a classifieds home with us"
      description={`${SITE_CONFIG.name} is a small, independent team shaping a marketplace that trades on trust and legible design. If that sounds like your pace, look around—one of these might be yours.`}
      actions={
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          Email the team →
        </Link>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-5 md:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.title}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                  {role.team}
                </span>
                <span className="rounded-full border border-[#e8ddd4] bg-[#faf4ec] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a08974]">
                  {role.location}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{role.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5348]">{role.summary}</p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#7c6aa8] hover:underline"
              >
                Read full role →
              </Link>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-3xl font-semibold text-[#2a1f2e]">What you can expect</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-white/60 bg-white/85 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcd0e5] bg-[#f3edf8]">
                  <b.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2a1f2e]">{b.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a4a5c]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
