'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)] text-[#1c1410]">
      <div className="relative mx-auto flex min-h-screen max-w-md items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(196,181,220,0.32),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(232,213,196,0.45),transparent_40%)]" />
        <div className="relative w-full rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-9 shadow-[0_22px_55px_rgba(50,32,24,0.08)]">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8] hover:text-[#5a4a88]">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </Link>

          {!isSubmitted ? (
            <>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">Recover access</p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em]">Forgot your password?</h1>
              <p className="mt-3 text-sm leading-7 text-[#6b5348]">
                Enter the email you used to post or browse ads. We’ll send a one-time reset link that expires in 30 minutes.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a08974]" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3] pl-10"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 rounded-full bg-[#2a1f2e] text-sm font-semibold text-white hover:bg-[#3c2d41]"
                >
                  {isLoading ? 'Sending reset link…' : 'Send reset link'}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#c2e2c2] bg-[#eef8ee]">
                <CheckCircle2 className="h-7 w-7 text-[#437a43]" />
              </div>
              <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em]">Check your inbox</h1>
              <p className="mt-3 text-sm leading-7 text-[#6b5348]">
                We sent a reset link to <strong className="text-[#1c1410]">{email}</strong>. It works for the next 30 minutes.
              </p>
              <Button
                asChild
                className="mt-7 h-12 w-full rounded-full bg-[#2a1f2e] text-sm font-semibold text-white hover:bg-[#3c2d41]"
              >
                <Link href="/login">Back to sign in</Link>
              </Button>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#7c6aa8] hover:underline"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
