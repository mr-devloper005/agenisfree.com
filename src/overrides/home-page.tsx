import Link from 'next/link'
import { ArrowRight, ChevronRight, Sparkles, Star } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { mockClassifiedAds, mockTestimonials, mockUsers } from '@/data/mock-data'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const cream = 'bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)]'
const ink = 'text-[#1a1410]'
const muted = 'text-[#6b5348]'
const line = 'border-[#e5d8cc]'
const panel = `rounded-[2rem] border ${line} bg-[#fffdfb]/95 shadow-[0_28px_80px_rgba(50,32,24,0.07)]`
const pillDark = 'rounded-full bg-[#1a1410] px-5 py-2.5 text-sm font-semibold text-[#fff8f0] hover:bg-[#2c241c]'
const pillGhost = `rounded-full border ${line} bg-white/90 px-5 py-2.5 text-sm font-semibold ${ink} hover:bg-[#faf4ec]`
const lavenderBand = 'bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)]'

function HeroThumb({ src, alt, href }: { src: string; alt: string; href: string }) {
  return (
    <Link href={href} className="group relative block w-[min(38vw,8.75rem)] shrink-0 sm:w-36">
      <div className="relative aspect-[10/11] rotate-45 overflow-hidden rounded-3xl border border-[#dcd0c4] bg-[#f8f1ea] shadow-[0_12px_40px_rgba(40,28,20,0.12)] transition-transform duration-500 group-hover:scale-[1.04]">
        <div className="absolute inset-0 -rotate-45 scale-[1.55]">
          <div className="relative h-full w-full">
            <ContentImage src={src} alt={alt} fill className="object-cover" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('classified', 12, { allowMockFallback: true })
  const heroAds = mockClassifiedAds.slice(0, 5)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${baseUrl}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  const stats = [
    { value: '52K+', label: 'Live ads' },
    { value: '38K+', label: 'Happy buyers' },
    { value: '120+', label: 'Cities covered' },
  ]

  const rows = [
    {
      title: 'Electronics & gear',
      hint: 'Laptops, cameras, audio',
      href: '/classifieds',
      items: mockClassifiedAds.filter((a) => a.category === 'Electronics').slice(0, 6),
    },
    {
      title: 'Home & living',
      hint: 'Furniture, décor, appliances',
      href: '/classifieds',
      items: mockClassifiedAds.filter((a) => a.category === 'Home & Garden').slice(0, 6),
    },
  ]

  const sellers = mockUsers.slice(0, 4)

  return (
    <div className={`min-h-screen ${cream} ${ink}`}>
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#eadfd4]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,181,220,0.35),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(232,213,196,0.5),transparent_38%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#e0d2c8] bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5c4a42]">
              <Sparkles className="h-3.5 w-3.5 text-[#7c6aa8]" />
              Local classifieds, elevated
            </p>
            <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.35rem]">
              Your neighborhood marketplace for things worth finding again.
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-base leading-8 ${muted}`}>
              Curated layouts, honest photos, and seller-friendly tools—so browsing feels calm and posting an ad feels effortless.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/classifieds" className={pillDark}>
                Browse classifieds
                <ArrowRight className="ml-2 inline h-4 w-4 align-middle" />
              </Link>
              <Link href="/create" className={pillGhost}>
                Post an ad
              </Link>
            </div>

            <div className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-6 sm:gap-10">
              {heroAds.map((ad) => (
                <HeroThumb key={ad.id} src={ad.images[0] || '/placeholder.svg'} alt={ad.title} href={`/classifieds/${ad.slug}`} />
              ))}
              <div className="hidden h-24 w-28 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#1a1410] bg-[#1a1410] text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f6e9dc] sm:flex">
                Since
                <span className="mt-1 block text-lg tracking-tight text-white">2018</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#eadfd4] bg-[#fffdfb]/80 py-10">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-3 text-center">
                <Star className="h-4 w-4 shrink-0 text-[#c4b5dc]" aria-hidden />
                <div>
                  <p className="font-display text-3xl font-semibold sm:text-4xl">{s.value}</p>
                  <p className={`mt-1 text-xs font-medium uppercase tracking-[0.2em] ${muted}`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category carousels */}
        {rows.map((row) => (
          <section key={row.title} className="border-b border-[#eadfd4] py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`mb-8 flex flex-col gap-4 border-b ${line} pb-6 sm:flex-row sm:items-end sm:justify-between`}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">{row.hint}</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">{row.title}</h2>
                </div>
                <Link href={row.href} className={`inline-flex w-fit items-center gap-2 ${pillDark}`}>
                  Discover
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute right-0 top-4 z-10 rounded-full border border-[#e0d2c8] bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c4a42] shadow-sm">
                  Drag →
                </div>
                <div className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 scrollbar-thin">
                  {(row.items.length ? row.items : mockClassifiedAds.slice(0, 4)).map((ad) => (
                    <Link
                      key={ad.id}
                      href={`/classifieds/${ad.slug}`}
                      className={`snap-start ${panel} w-[min(280px,78vw)] shrink-0 overflow-hidden transition hover:-translate-y-0.5`}
                    >
                      <div className="relative aspect-[4/3]">
                        <ContentImage src={ad.images[0] || '/placeholder.svg'} alt={ad.title} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">{ad.category}</p>
                        <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug">{ad.title}</h3>
                        <p className={`mt-2 text-xs ${muted}`}>
                          {ad.seller?.name ?? 'Local seller'} ·{' '}
                          {new Date(ad.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Sellers */}
        <section className="border-b border-[#eadfd4] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">Trusted voices</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">Top-rated local sellers</h2>
                <p className={`mt-3 max-w-xl text-sm leading-7 ${muted}`}>People who ship fast, describe honestly, and answer messages within a day.</p>
              </div>
              <span className={`w-fit rounded-full border ${line} bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5c4a42]`}>
                Popular
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sellers.map((u, idx) => (
                <div key={u.id} className={`${panel} p-6 text-center`}>
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#e8ddd4]">
                    <ContentImage src={u.avatar} alt={u.name} width={96} height={96} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-4 font-display text-xl font-semibold">{u.name}</p>
                  <p className={`mt-1 text-xs ${muted}`}>{[48, 72, 36, 91][idx] || 40}+ ads posted</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-amber-600">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i === 4 ? 'opacity-40' : ''}`} fill="currentColor" />
                    ))}
                    <span className={`ml-1 text-[11px] font-medium ${muted}`}>({120 + idx * 17}+ reviews)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial band */}
        <section className={`${lavenderBand} border-b border-[#dcd0e5] py-16`}>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#2a1f2e] sm:text-4xl">Notes from the marketplace desk</h2>
            <p className="mx-auto mt-6 text-sm leading-8 text-[#5a4a5c]">
              We built {SITE_CONFIG.name} for neighbors who prefer polite buying over endless feeds. Listings stay readable, photos stay large, and every category
              gets the same quiet typography—so you spend less time decoding the interface and more time finding the right deal.
            </p>
            <Link href="/about" className={`mt-8 inline-flex items-center gap-2 ${pillDark}`}>
              Read more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-[#eadfd4] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">Community pulse</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">Buyers & sellers, in their words</h2>
              </div>
              <p className="font-display text-2xl font-semibold text-[#7c6aa8]">40K+ notes of appreciation</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {mockTestimonials.map((t) => (
                <blockquote key={t.id} className={`${panel} p-6`}>
                  <div className="flex items-center gap-3">
                    <ContentImage src={t.author.avatar} alt={t.author.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{t.author.name}</p>
                      <p className={`text-xs ${muted}`}>
                        {t.role}
                        {t.company ? ` · ${t.company}` : ''}
                      </p>
                    </div>
                  </div>
                  <p className={`mt-4 text-sm leading-7 ${muted}`}>“{t.content}”</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Post teaser + live feed strip */}
        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_1.05fr] sm:px-6 lg:px-8">
            <div className={`${panel} p-8`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">Sell something today</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em]">Post a standout classified ad</h2>
              <p className={`mt-3 text-sm leading-7 ${muted}`}>Add a title, price, and a handful of photos. Buyers message you here—no awkward comment threads.</p>
              <div className="mt-6 grid gap-4">
                <input readOnly className="h-12 rounded-xl border border-[#e8ddd4] bg-white px-4 text-sm" placeholder="What are you selling?" />
                <input readOnly type="email" className="h-12 rounded-xl border border-[#e8ddd4] bg-white px-4 text-sm" placeholder="Contact email" />
                <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-[#d2c4b8] bg-[#faf4ec]/80 text-sm text-[#7a655b]">Drag photos here (after you sign in)</div>
                <Link href="/create" className={`inline-flex h-12 items-center justify-center ${pillDark}`}>
                  Continue to publish
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">Fresh on the board</p>
              <h3 className="font-display text-2xl font-semibold">Latest arrivals from the feed</h3>
              <div className="grid gap-4">
                {posts.slice(0, 5).map((post) => {
                  const img =
                    (Array.isArray(post.media) && post.media.find((m) => typeof m?.url === 'string')?.url) ||
                    '/placeholder.svg?height=400&width=600'
                  return (
                    <Link
                      key={post.id}
                      href={`/classifieds/${post.slug}`}
                      className={`flex gap-4 rounded-2xl border ${line} bg-[#fffdfb] p-4 transition hover:border-[#cfc2ee]/80 hover:shadow-md`}
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                        <ContentImage src={img} alt={post.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-medium leading-snug">{post.title}</p>
                        <p className={`mt-1 text-xs ${muted}`}>{post.summary?.slice(0, 90) || 'Local pickup · verified photos'}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
