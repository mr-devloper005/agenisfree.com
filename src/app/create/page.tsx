'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  MapPin,
  Sparkles,
  Tag as TagIcon,
  Wand2,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { addLocalPost } from '@/lib/local-posts'
import { CATEGORY_OPTIONS } from '@/lib/categories'

const tips = [
  {
    icon: Camera,
    title: 'Lead with an honest photo',
    body: 'Shoot in daylight on a plain surface. Show one angle that reveals any wear—buyers trust sellers who do not hide flaws.',
  },
  {
    icon: TagIcon,
    title: 'Price for the weekend',
    body: 'Skim three similar live ads in your city, then price 5–10% below to spark first-48-hour conversations.',
  },
  {
    icon: MapPin,
    title: 'Pin the neighborhood',
    body: 'Local buyers search by area. A neighborhood name plus a landmark turns casual browsers into serious messages.',
  },
]

export default function CreateAdPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState('')
  const [tags, setTags] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const completion = useMemo(() => {
    const fields = [title, price, category, location, summary, description, images]
    const filled = fields.filter((v) => v.trim().length > 0).length
    return Math.round((filled / fields.length) * 100)
  }, [title, price, category, location, summary, description, images])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: 'Sign in to post',
        description: 'Create a free account to publish this classified.',
      })
      router.push('/login')
      return
    }
    if (!title.trim() || !summary.trim() || !description.trim() || !category) {
      toast({
        title: 'Missing details',
        description: 'Title, summary, description and category are required.',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)
    const imageUrls = images
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const tagList = tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const content: Record<string, unknown> = { type: 'classified' }
    if (category) content.category = category
    if (description) content.description = description
    if (location) content.location = location
    if (price) content.price = price

    const post = addLocalPost({
      task: 'classified',
      title: title.trim(),
      summary: summary.trim(),
      authorName: user.name,
      tags: tagList,
      content,
      media: imageUrls.map((url) => ({ url, type: 'IMAGE' })),
      publishedAt: new Date().toISOString(),
    })

    toast({
      title: 'Classified published',
      description: 'Your ad was saved to this browser and is live on the board.',
    })

    setSubmitting(false)
    router.push(`/local/classified/${post.slug}`)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)] text-[#1c1410]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#eadfd4]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(196,181,220,0.32),transparent_42%),radial-gradient(circle_at_90%_0%,rgba(232,213,196,0.45),transparent_36%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              href="/classifieds"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8] hover:text-[#5a4a88]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to classifieds
            </Link>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">
                  Post an ad · free &amp; local
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  Turn the thing you no longer use into a reason for someone’s good week.
                </h1>
                <p className="mt-4 text-base leading-8 text-[#6b5348]">
                  It takes about four minutes. Write like you’d tell a neighbor, add a clean photo, and we’ll handle the rest.
                </p>
              </div>
              <div className="rounded-2xl border border-[#dcd0e5] bg-[#f3edf8] px-5 py-4 text-sm shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-[#2a1f2e]">
                  <Wand2 className="h-4 w-4" /> Listing progress
                </div>
                <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-white/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7c6aa8] to-[#a792c8] transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#5a4a5c]">{completion}% of essentials filled</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10"
            >
              <h2 className="font-display text-2xl font-semibold">The basics</h2>
              <p className="mt-2 text-sm text-[#6b5348]">Everything here is visible to buyers.</p>

              <div className="mt-6 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Ad title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Mid-century walnut desk · great condition"
                    className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="€180 or ‘open to offers’"
                      className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                      Category *
                    </Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-12 rounded-xl border border-[#e8ddd4] bg-[#faf7f3] px-3 text-sm focus:border-[#7c6aa8] focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Neighborhood, city"
                    className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Short summary *
                  </Label>
                  <Textarea
                    id="summary"
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="One honest sentence buyers can skim on the board."
                    className="rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Full description *
                  </Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Dimensions, age, condition, why you’re selling, pickup notes…"
                    className="rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                </div>
              </div>

              <h2 className="mt-10 font-display text-2xl font-semibold">Photos &amp; tags</h2>
              <div className="mt-5 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="images" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Photo URLs (comma separated)
                  </Label>
                  <Textarea
                    id="images"
                    rows={2}
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                    placeholder="https://…/front.jpg, https://…/back.jpg"
                    className="rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                  <p className="text-xs text-[#a08974]">
                    Up to six photos. First image becomes the cover shown on the board.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">
                    Tags (comma separated)
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="vintage, walnut, handmade"
                    className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#efe6de] pt-6">
                <p className="text-xs text-[#a08974]">
                  Your ad is stored on this device until you sign in and sync.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/classifieds"
                    className="inline-flex items-center justify-center rounded-full border border-[#e8ddd4] bg-white px-5 py-3 text-sm font-semibold text-[#1c1410] transition hover:border-[#cdb9e3]"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41] disabled:opacity-60"
                  >
                    <Sparkles className="h-4 w-4" />
                    {submitting ? 'Publishing…' : 'Publish classified'}
                  </button>
                </div>
              </div>
            </form>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8]">Three quick wins</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#2a1f2e]">Ads that move fast</h3>
                <div className="mt-5 space-y-4">
                  {tips.map((tip) => (
                    <div key={tip.title} className="rounded-2xl border border-white/60 bg-white/85 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#dcd0e5] bg-[#f3edf8]">
                          <tip.icon className="h-4 w-4 text-[#7c6aa8]" />
                        </div>
                        <p className="text-sm font-semibold text-[#2a1f2e]">{tip.title}</p>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-[#5a4a5c]">{tip.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.05)]">
                <h3 className="font-display text-xl font-semibold">What happens next</h3>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b5348]">
                  {[
                    'Ad appears on the board within seconds of publishing.',
                    'Buyers message you through the inbox—no phone number shared.',
                    'Mark the item sold when you close the deal and it archives cleanly.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7c6aa8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
