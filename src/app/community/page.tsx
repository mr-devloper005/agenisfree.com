import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Users, MessageCircle, MapPin, CalendarDays } from 'lucide-react'

const circles = [
  {
    city: 'Lisbon',
    members: 1240,
    cadence: 'First Saturday of each month',
    focus: 'Vintage furniture · ceramics · small-batch makers',
  },
  {
    city: 'Austin',
    members: 980,
    cadence: 'Every other Sunday',
    focus: 'Gear swap · musical instruments · garage finds',
  },
  {
    city: 'Bengaluru',
    members: 2150,
    cadence: 'Weekly online coffee',
    focus: 'Electronics · vintage sarees · apartment essentials',
  },
  {
    city: 'Berlin',
    members: 1530,
    cadence: 'Flea-market weekends',
    focus: 'Cycling · design books · kids’ gear',
  },
]

const rituals = [
  {
    icon: MessageCircle,
    title: 'Seller circles',
    body: 'Small group chats where new sellers get feedback on their first three ads before they go live.',
  },
  {
    icon: CalendarDays,
    title: 'Monthly meetups',
    body: 'Coffee, show-and-tell, and photography clinics hosted by city leads in a neighborhood café.',
  },
  {
    icon: Users,
    title: 'Neighbor favor board',
    body: 'A non-commercial thread where members trade skills: a haircut for a bike repair, a loaf for a math lesson.',
  },
]

export default function CommunityPage() {
  return (
    <PageShell
      eyebrow="Community"
      title="Classifieds with a village attached"
      description="A marketplace is only as warm as the people in it. These are the circles, rituals, and city meetups that keep ours feeling human."
      actions={
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          Join the community →
        </Link>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-5 md:grid-cols-2">
          {circles.map((c) => (
            <article key={c.city} className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.04)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                    <MapPin className="h-4 w-4 text-[#7c6aa8]" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{c.city}</h3>
                </div>
                <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                  {c.members.toLocaleString()} members
                </span>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#6b5348]"><strong className="text-[#1c1410]">Meets:</strong> {c.cadence}</p>
              <p className="mt-1 text-sm leading-7 text-[#6b5348]"><strong className="text-[#1c1410]">Focus:</strong> {c.focus}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
          <h2 className="font-display text-3xl font-semibold text-[#2a1f2e]">Rituals we protect</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {rituals.map((r) => (
              <div key={r.title} className="rounded-2xl border border-white/60 bg-white/85 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dcd0e5] bg-[#f3edf8]">
                  <r.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2a1f2e]">{r.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a4a5c]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
