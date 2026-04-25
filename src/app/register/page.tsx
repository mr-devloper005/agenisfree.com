import Link from 'next/link'
import { ArrowLeft, Sparkles, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ClassifiedRegisterForm } from '@/components/auth/classified-auth-forms'

const perks = [
  { title: 'Free forever', body: 'Post, edit, and renew classifieds without paying a cent.' },
  { title: 'Local first', body: 'Reach neighbors before the whole internet sees your ad.' },
  { title: 'Seller-friendly tools', body: 'Save drafts, duplicate ads, and track views at a glance.' },
]

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)] text-[#1c1410]">
      <NavbarShell />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(196,181,220,0.32),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(232,213,196,0.45),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8] hover:text-[#5a4a88]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <aside className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80">
                <Tag className="h-5 w-5 text-[#7c6aa8]" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">
                Join the marketplace
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-[#2a1f2e]">
                Create your seller account
              </h1>
              <p className="mt-5 text-sm leading-8 text-[#5a4a5c]">
                One account covers every classified you post. No approvals, no up-sells—just the tools you need to turn a
                weekend idea into a closed deal.
              </p>

              <div className="mt-8 grid gap-3">
                {perks.map((p) => (
                  <div key={p.title} className="rounded-2xl border border-white/60 bg-white/85 p-4">
                    <p className="text-sm font-semibold text-[#2a1f2e]">{p.title}</p>
                    <p className="mt-1 text-sm leading-7 text-[#5a4a5c]">{p.body}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_22px_60px_rgba(50,32,24,0.08)] sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">Create account</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Start posting in minutes</h2>
              <p className="mt-2 text-sm text-[#6b5348]">
                All we need is a name, an email, and a password. You can add photos and ads later.
              </p>
              <ClassifiedRegisterForm actionClass="bg-[#2a1f2e] text-white hover:bg-[#3c2d41]" />
              <div className="mt-6 flex items-center justify-between text-sm text-[#6b5348]">
                <span>Already have an account?</span>
                <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#7c6aa8] hover:underline">
                  <Sparkles className="h-4 w-4" />
                  Sign in
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
