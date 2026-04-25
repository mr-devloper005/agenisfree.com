import Link from 'next/link'
import { ArrowLeft, Sparkles, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ClassifiedLoginForm } from '@/components/auth/classified-auth-forms'

const bullets = [
  'Post and manage ads in minutes—clean photos, clear prices.',
  'Chat with local buyers through the in-app inbox, no phone sharing.',
  'Your session stays on this device until you choose to sign out.',
]

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)] text-[#1c1410]">
      <NavbarShell />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(196,181,220,0.32),transparent_45%),radial-gradient(circle_at_88%_0%,rgba(232,213,196,0.45),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8] hover:text-[#5a4a88]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
            <aside className="rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/80">
                <Tag className="h-5 w-5 text-[#7c6aa8]" />
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">
                Welcome back
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] text-[#2a1f2e]">
                Sign in to your marketplace
              </h1>
              <p className="mt-5 text-sm leading-8 text-[#5a4a5c]">
                Keep managing classifieds, reply to buyers, and keep your neighborhood listings fresh—without dropping into
                a generic admin screen.
              </p>
              <div className="mt-8 grid gap-3">
                {bullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/60 bg-white/85 px-4 py-4 text-sm leading-relaxed text-[#2a1f2e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <div className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_22px_60px_rgba(50,32,24,0.08)] sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">Sign in</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Good to see you again</h2>
              <p className="mt-2 text-sm text-[#6b5348]">Enter the details you used when you created your account.</p>
              <ClassifiedLoginForm actionClass="bg-[#2a1f2e] text-white hover:bg-[#3c2d41]" />
              <div className="mt-6 flex items-center justify-between text-sm text-[#6b5348]">
                <Link href="/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#7c6aa8] hover:underline">
                  <Sparkles className="h-4 w-4" />
                  Create account
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
