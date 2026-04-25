'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ClassifiedAuthShellProps = {
  actionClass: string
}

export function ClassifiedLoginForm({ actionClass }: ClassifiedAuthShellProps) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Enter your email and password to continue.', variant: 'destructive' })
      return
    }
    try {
      await login(email.trim(), password)
      toast({ title: 'Signed in', description: 'Your session was saved on this device.' })
      router.push('/')
      router.refresh()
    } catch {
      toast({ title: 'Sign in failed', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="h-12 rounded-xl border-border/80 bg-background/80"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="h-12 rounded-xl border-border/80 bg-background/80"
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClass}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}

export function ClassifiedRegisterForm({ actionClass }: ClassifiedAuthShellProps) {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Add your name, email, and a password to create an account.', variant: 'destructive' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Welcome aboard', description: 'You are signed in and saved on this device.' })
      router.push('/')
      router.refresh()
    } catch {
      toast({ title: 'Could not register', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="reg-name" className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Full name
        </Label>
        <Input
          id="reg-name"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="h-12 rounded-xl border-border/80 bg-background/80"
          placeholder="Alex Morgan"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg-email" className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Email
        </Label>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="h-12 rounded-xl border-border/80 bg-background/80"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg-password" className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
          Password
        </Label>
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="h-12 rounded-xl border-border/80 bg-background/80"
          placeholder="Create a strong password"
        />
      </div>
      <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${actionClass}`}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
