import { PageShell } from '@/components/shared/page-shell'
import { ShieldCheck, Mail, Database, UserCheck, Lock, Bell } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    icon: Database,
    title: 'Information we collect',
    body:
      'Account basics (name, email), listings you publish, photos you upload, and anonymized usage analytics so we can tune the marketplace. We never buy data from brokers.',
  },
  {
    icon: UserCheck,
    title: 'How we use it',
    body:
      'To show you relevant classifieds, deliver messages between buyers and sellers, keep the platform safe from spam, and send the occasional product email you can opt out of anytime.',
  },
  {
    icon: Lock,
    title: 'How we protect it',
    body:
      'Encryption in transit and at rest, role-based internal access, quarterly security reviews, and automatic session expiry so stale tokens can not be used against your account.',
  },
  {
    icon: Bell,
    title: 'Your controls',
    body:
      'Export your data, edit or delete any ad, switch off marketing email from Settings, and request a full account erasure with one email to the privacy desk.',
  },
]

const faqs = [
  {
    q: 'Do you share data with third parties?',
    a: 'Only with processors who help run the service (hosting, email delivery) and only under strict data-processing agreements.',
  },
  {
    q: 'Can buyers see my phone number?',
    a: 'No. Messages route through in-app threads. You choose when to share contact details directly with a buyer you trust.',
  },
  {
    q: 'How long do you keep closed ads?',
    a: 'Closed or sold ads stay archived for 90 days so you can repost quickly, then they are permanently removed from our systems.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="Your data, handled with care"
      description={`${SITE_CONFIG.name} is a classifieds marketplace, not an advertising network. This page explains what we collect, what we do not, and the controls you get.`}
    >
      <div className="space-y-10">
        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8ddd4] bg-[#faf4ec]">
              <ShieldCheck className="h-5 w-5 text-[#7c6aa8]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">Effective</p>
              <p className="text-sm font-semibold">March 16, 2026</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-8 text-[#6b5348]">
            We built this policy in plain language because a classifieds site should not require a legal degree to join. If anything here is
            unclear, reach out to <a href="mailto:privacy@agenisfree.com" className="underline underline-offset-4">privacy@agenisfree.com</a> and
            a real person will reply.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                  <pillar.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <h2 className="font-display text-xl font-semibold">{pillar.title}</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#6b5348]">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-[#2a1f2e]">Questions people actually ask</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/60 bg-white/85 p-5">
                <p className="text-sm font-semibold text-[#2a1f2e]">{faq.q}</p>
                <p className="mt-2 text-sm leading-7 text-[#5a4a5c]">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#5a4a5c]">
            <Mail className="h-4 w-4" />
            <span>Write to the privacy desk at</span>
            <a href="mailto:privacy@agenisfree.com" className="font-semibold text-[#2a1f2e] underline-offset-4 hover:underline">
              privacy@agenisfree.com
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
