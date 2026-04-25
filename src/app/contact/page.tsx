'use client'

import { useState } from 'react'
import { PageShell } from '@/components/shared/page-shell'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import {
  Handshake,
  ShieldCheck,
  MapPin,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

const lanes = [
  {
    icon: Handshake,
    title: 'Seller success',
    body: 'Stuck on a draft, pricing, or photo lighting? A success lead will look at your ad and send suggestions within a day.',
    tag: 'Reply in 4h (weekdays)',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & safety',
    body: 'Report a suspicious buyer, a removed ad you want reviewed, or a pattern you have noticed on the board.',
    tag: 'Reply in 2h',
  },
  {
    icon: MapPin,
    title: 'Local partnerships',
    body: 'Run a weekend market, neighborhood paper, or repair co-op? Let us talk about a city collaboration.',
    tag: 'Reply in 1 business day',
  },
]

const lounge = [
  { icon: Mail, label: 'Email', value: 'hello@agenisfree.com' },
  { icon: Clock, label: 'Hours', value: 'Monday–Friday · 9am to 6pm WET' },
  { icon: MessageCircle, label: 'Community', value: 'Seller circles meet weekly in chat' },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: 'A quick heads-up',
        description: 'Please add your name, email, and a short message.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      toast({
        title: 'Message sent',
        description: 'A real person will reply at the address above.',
      })
      setName('')
      setEmail('')
      setTopic('')
      setMessage('')
      setSubmitting(false)
    }, 700)
  }

  return (
    <PageShell
      eyebrow="Contact"
      title="Write like you would to a neighbor"
      description="Every message lands with a human on our marketplace team. Pick the lane that fits and we will route it from there."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <div
              key={lane.title}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_14px_40px_rgba(50,32,24,0.05)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8ddd4] bg-[#faf4ec]">
                  <lane.icon className="h-4 w-4 text-[#7c6aa8]" />
                </div>
                <h2 className="font-display text-xl font-semibold">{lane.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#6b5348]">{lane.body}</p>
              <span className="mt-4 inline-flex rounded-full border border-[#dcd0e5] bg-[#f3edf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c6aa8]">
                {lane.tag}
              </span>
            </div>
          ))}

          <div className="rounded-2xl border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-6">
            <h3 className="font-display text-lg font-semibold text-[#2a1f2e]">Quiet corners</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#5a4a5c]">
              {lounge.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-[#7c6aa8]" />
                  <span className="font-semibold text-[#2a1f2e]">{item.label}:</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-[#e8ddd4] bg-[#fffdfb]/95 p-8 shadow-[0_18px_50px_rgba(50,32,24,0.06)] sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6aa8]">Send a note</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">We read every message</h2>

          <div className="mt-6 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">Your name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should we greet you?"
                  className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="topic" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ad trouble, partnership, bug report…"
                className="h-12 rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5348]">Message</Label>
              <Textarea
                id="message"
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share the full context—ad URLs, screenshots, or anything that helps us respond precisely."
                className="rounded-xl border-[#e8ddd4] bg-[#faf7f3]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#2a1f2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c2d41] disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            {submitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}
