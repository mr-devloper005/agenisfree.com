import { PageShell } from '@/components/shared/page-shell'
import { Heart } from 'lucide-react'

const stacks = [
  {
    title: 'Framework & runtime',
    items: [
      { name: 'Next.js', license: 'MIT' },
      { name: 'React', license: 'MIT' },
      { name: 'TypeScript', license: 'Apache 2.0' },
      { name: 'Node.js', license: 'MIT' },
    ],
  },
  {
    title: 'Design system',
    items: [
      { name: 'Tailwind CSS', license: 'MIT' },
      { name: 'Radix UI', license: 'MIT' },
      { name: 'Lucide Icons', license: 'ISC' },
      { name: 'Fraunces (font)', license: 'OFL' },
      { name: 'Manrope (font)', license: 'OFL' },
    ],
  },
  {
    title: 'Media & photography',
    items: [
      { name: 'Unsplash', license: 'Unsplash License' },
      { name: 'Sample seller portraits', license: 'Used with permission' },
    ],
  },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Acknowledgements"
      title="The shoulders we stand on"
      description="Every open-source library, font, and media source that helps make this marketplace feel considered. Thank you to the maintainers behind each one."
    >
      <div className="space-y-8">
        {stacks.map((stack) => (
          <div key={stack.title} className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-7 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-9">
            <h2 className="font-display text-2xl font-semibold">{stack.title}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {stack.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-[#efe6de] bg-[#faf7f3]/80 px-5 py-4">
                  <span className="font-medium text-[#1c1410]">{item.name}</span>
                  <span className="rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7c6aa8]">
                    {item.license}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 text-center sm:p-10">
          <Heart className="mx-auto h-6 w-6 text-[#7c6aa8]" />
          <h3 className="mt-3 font-display text-2xl font-semibold text-[#2a1f2e]">Built with gratitude</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#5a4a5c]">
            If you maintain one of the projects above and spot an attribution mistake, email us and we will correct it before the next deploy.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
