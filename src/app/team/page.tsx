import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles } from 'lucide-react'

const team = [
  {
    name: 'Maya Okafor',
    role: 'Founder & product lead',
    bio: 'Grew up helping her mother run a weekend bazaar. Obsessed with the rituals that make small trades feel fair.',
    city: 'Lisbon',
  },
  {
    name: 'Devon Park',
    role: 'Marketplace operations',
    bio: 'Built trust & safety systems at two community platforms. Believes moderation is a craft, not a policy PDF.',
    city: 'Seoul',
  },
  {
    name: 'Amira Saleh',
    role: 'Design director',
    bio: 'Types with a pencil. Shapes a site that rewards patience over dopamine.',
    city: 'Cairo',
  },
  {
    name: 'Julian Fiore',
    role: 'Engineering lead',
    bio: 'Ex-logistics engineer. Treats load times like lost packages—chases them until they arrive.',
    city: 'Milan',
  },
  {
    name: 'Priya Varma',
    role: 'Community & partnerships',
    bio: 'Runs the seller circles in six cities. Knows the difference between a good photo and a good listing.',
    city: 'Bengaluru',
  },
  {
    name: 'Teo Andersson',
    role: 'Data & research',
    bio: 'Turns search logs into calmer category pages. Reads every weekly customer letter twice.',
    city: 'Stockholm',
  },
]

export default function TeamPage() {
  return (
    <PageShell
      eyebrow="Our team"
      title="The small crew behind the marketplace"
      description="Six people, four time zones, one shared belief: a classifieds site can feel like a weekend market instead of a billboard."
      actions={
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 rounded-full bg-[#2a1f2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41]"
        >
          <Sparkles className="h-4 w-4" />
          We’re hiring
        </Link>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <article
            key={member.name}
            className="rounded-[1.75rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#cdb9e3]"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border border-[#e8ddd4]">
                <AvatarFallback className="bg-[#f3edf8] text-sm font-semibold text-[#7c6aa8]">
                  {member.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#7c6aa8]">{member.role}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#6b5348]">{member.bio}</p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a08974]">Based in {member.city}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-[#2a1f2e]">How we work</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3 text-sm leading-7 text-[#5a4a5c]">
          <p>
            <strong className="block text-[#2a1f2e]">Weekly listening.</strong>
            Every Friday we read ten customer letters aloud before shipping anything new.
          </p>
          <p>
            <strong className="block text-[#2a1f2e]">Tiny releases.</strong>
            Short cycles, narrow scope. The marketplace earns changes with evidence.
          </p>
          <p>
            <strong className="block text-[#2a1f2e]">Human moderation.</strong>
            Real moderators review appeals. No silent automated bans.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
