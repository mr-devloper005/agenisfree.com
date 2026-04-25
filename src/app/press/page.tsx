import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Download, Newspaper, Quote } from 'lucide-react'

const assets = [
  { title: 'Wordmark (SVG + PNG)', description: 'Primary logo set in Fraunces. Includes cream, ink, and inverse variants.', type: 'ZIP · 3.2 MB' },
  { title: 'Product screenshots', description: 'Hand-picked stills of the home, classifieds, and seller dashboard.', type: 'ZIP · 48 MB' },
  { title: 'Brand guidelines', description: 'Typography, voice, palette, and do-not-do examples for media teams.', type: 'PDF · 2.1 MB' },
  { title: 'Founder headshots', description: 'High-resolution portraits for editorial use.', type: 'ZIP · 24 MB' },
]

const coverage = [
  {
    outlet: 'The Marketplace Review',
    headline: 'How Agenisfree is making classifieds feel human again',
    date: 'March 02, 2026',
  },
  {
    outlet: 'Slow Internet Weekly',
    headline: 'A marketplace that reads like a magazine: inside Agenisfree’s editorial-first redesign',
    date: 'February 14, 2026',
  },
  {
    outlet: 'City Tech Digest',
    headline: 'Six cities, one playbook: the community circles powering Agenisfree’s growth',
    date: 'January 28, 2026',
  },
]

export default function PressPage() {
  return (
    <PageShell
      eyebrow="Press"
      title="For journalists, writers, and curious readers"
      description="Everything you need to write about Agenisfree accurately—logos, product shots, brand voice, and the story so far."
      actions={
        <Link
          href="mailto:press@agenisfree.com"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          Email the press desk
        </Link>
      }
    >
      <div className="space-y-10">
        <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
          <h2 className="font-display text-2xl font-semibold">Brand & media assets</h2>
          <p className="mt-2 text-sm leading-7 text-[#6b5348]">
            Free for editorial use with a link back to agenisfree.com. Drop us a note if you need something not listed here.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {assets.map((asset) => (
              <div key={asset.title} className="flex flex-col gap-3 rounded-2xl border border-[#efe6de] bg-[#faf7f3]/80 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#1c1410]">{asset.title}</p>
                  <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c6aa8]">
                    {asset.type}
                  </span>
                </div>
                <p className="text-sm leading-7 text-[#6b5348]">{asset.description}</p>
                <button className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-[#e8ddd4] bg-[#fffdfb] px-4 py-2 text-xs font-semibold text-[#1c1410] transition hover:border-[#cdb9e3]">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <Newspaper className="h-5 w-5 text-[#7c6aa8]" /> Recent coverage
            </h2>
            <div className="mt-5 space-y-4">
              {coverage.map((c) => (
                <article key={c.headline} className="rounded-2xl border border-[#efe6de] bg-[#faf7f3]/80 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7c6aa8]">{c.outlet}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{c.headline}</h3>
                  <p className="mt-2 text-xs text-[#a08974]">{c.date}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
            <Quote className="h-6 w-6 text-[#7c6aa8]" />
            <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug text-[#2a1f2e]">
              “We set out to make the sort of classifieds site you would leave open in a new tab, the way you once left a favorite magazine open on a coffee table.”
            </blockquote>
            <p className="mt-4 text-sm text-[#5a4a5c]">— Maya Okafor, founder</p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
