import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tag, MessageCircle, Camera, Search, ShieldCheck, Handshake } from 'lucide-react'

const topics = [
  {
    icon: Tag,
    title: 'Post your first classified',
    body: 'Pick a category, write a clear title, add three or four photos, and price it with confidence. Ads go live the moment you hit publish.',
    href: '/register',
    cta: 'Start an ad',
  },
  {
    icon: Camera,
    title: 'Photograph items that sell',
    body: 'Natural light, a plain surface, and one angle that shows any flaws. Buyers trust the seller who does not hide scratches.',
    href: '/about',
    cta: 'See examples',
  },
  {
    icon: Search,
    title: 'Search the smart way',
    body: 'Use city + keyword filters, save a search to get fresh matches in your inbox, and favorite listings to revisit without losing them.',
    href: '/classifieds',
    cta: 'Browse classifieds',
  },
  {
    icon: MessageCircle,
    title: 'Message like a pro',
    body: 'Open with a short, specific question. Agree on meet-up logistics before sharing personal numbers. Keep polite and you will close faster.',
    href: '/contact',
    cta: 'Talk to support',
  },
  {
    icon: ShieldCheck,
    title: 'Stay safe',
    body: 'Meet in public, bring a friend for high-value items, and never wire money to a seller you have never spoken with.',
    href: '/privacy',
    cta: 'Safety guide',
  },
  {
    icon: Handshake,
    title: 'Handle tricky situations',
    body: 'Buyer ghosted you? Ad flagged by mistake? Our team reviews appeals within one business day.',
    href: '/contact',
    cta: 'Open a ticket',
  },
]

const faqs = [
  {
    id: 'faq-1',
    q: 'Is posting an ad free?',
    a: 'Yes—every standard classified is free to publish and free to browse. We offer an optional boost that pins your ad to the top of its category for 48 hours.',
  },
  {
    id: 'faq-2',
    q: 'How long do ads stay live?',
    a: 'Ads run for 30 days. You can renew in one click, edit the price, or mark the item sold whenever the deal closes.',
  },
  {
    id: 'faq-3',
    q: 'Can I delete messages from buyers?',
    a: 'You can archive any conversation from your inbox. Archived threads stay searchable for 60 days, then are permanently removed.',
  },
  {
    id: 'faq-4',
    q: 'What happens if my ad is reported?',
    a: 'A moderator reviews it within 24 hours. If it stays up, nothing changes. If it comes down, you will get an email explaining why and how to appeal.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Help center"
      title="Support that sounds like a neighbor"
      description="Everything you need to post, buy, and stay safe on the marketplace. If a guide below does not cover your case, our team responds within four hours on weekdays."
    >
      <div className="space-y-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#cdb9e3] hover:shadow-[0_22px_55px_rgba(124,106,168,0.15)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                <topic.icon className="h-4 w-4 text-[#7c6aa8]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5348]">{topic.body}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#7c6aa8] transition-transform group-hover:translate-x-1">
                {topic.cta} →
              </span>
            </Link>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">Frequent questions</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Straight answers, no runaround</h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#e8ddd4]">
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-[#6b5348]">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">Still stuck?</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#2a1f2e]">Talk to a human</h2>
            <p className="mt-4 text-sm leading-8 text-[#5a4a5c]">
              Moderators and success folks sit in the same room. Send a note describing what you are trying to do and we will
              usually get you unstuck before the coffee is cold.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
            >
              Contact support →
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
