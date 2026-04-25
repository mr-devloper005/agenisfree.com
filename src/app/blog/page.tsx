import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { ArrowUpRight } from 'lucide-react'

const featured = {
  tag: 'Field notes',
  title: 'The anatomy of an ad that sells within 48 hours',
  excerpt:
    'We studied 2,000 fast-moving classifieds on Agenisfree to find the small patterns buyers reward. It turns out the title, the first photo, and one honest sentence do 80% of the work.',
  read: '8 min read',
  author: 'Maya Okafor',
}

const posts = [
  {
    tag: 'Seller playbook',
    title: 'Pricing used furniture without leaving money on the table',
    excerpt: 'A four-step rubric we teach new sellers—covering condition bands, local benchmarks, and the honest anchor photo.',
    read: '6 min',
  },
  {
    tag: 'Behind the build',
    title: 'Why we ripped out infinite scroll',
    excerpt: 'Endless feeds belong on social apps, not marketplaces. A deep dive into the experiment that brought paginated categories back.',
    read: '5 min',
  },
  {
    tag: 'City stories',
    title: 'What 90 days of Lisbon classifieds taught us about neighborhoods',
    excerpt: 'Heatmaps, weekend rituals, and the quiet trade corridors that only become visible with enough data.',
    read: '7 min',
  },
  {
    tag: 'Trust & safety',
    title: 'How we handle scam reports without crushing new sellers',
    excerpt: 'The balance between strict moderation and giving first-time sellers room to learn the platform’s etiquette.',
    read: '9 min',
  },
  {
    tag: 'Design',
    title: 'Writing a category page that reads like a magazine shelf',
    excerpt: 'Typography choices, cover ratios, and the small editorial framings that make browsing feel purposeful.',
    read: '4 min',
  },
]

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Field notes"
      title="Stories from a calmer marketplace"
      description="A newsletter-style journal from the team and the community—covering how to sell well, what we’re shipping, and the stories behind unusual ads."
      actions={
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          Subscribe for weekly notes
        </Link>
      }
    >
      <div className="space-y-10">
        <article className="grid gap-8 rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c6aa8]">
              {featured.tag}
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em]">{featured.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#6b5348]">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-[#7f646b]">
              <span>By {featured.author}</span>
              <span>·</span>
              <span>{featured.read}</span>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[#dcd0e5] bg-[linear-gradient(140deg,#f3edf8_0%,#e8d5c4_100%)] p-8">
            <p className="font-display text-2xl font-semibold text-[#2a1f2e]">“Honest price, clear photo, one story.”</p>
            <p className="mt-3 text-sm text-[#5a4a5c]">The three ingredients shared by every ad that closed in a single weekend.</p>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#cdb9e3]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                  {post.tag}
                </span>
                <span className="text-xs text-[#a08974]">{post.read}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{post.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6b5348]">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#7c6aa8] transition-transform group-hover:translate-x-1">
                Read the note <ArrowUpRight className="h-4 w-4" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
