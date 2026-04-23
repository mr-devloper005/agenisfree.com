'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fdf9f3_0%,#faf4ec_45%,#f6efe6_100%)] text-[#1c1410]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#eadfd4]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(196,181,220,0.32),transparent_42%),radial-gradient(circle_at_85%_0%,rgba(232,213,196,0.42),transparent_36%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c6aa8]">
                  {eyebrow ?? 'Agenisfree notes'}
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[#6b5348]">
                    {description}
                  </p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
