import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"
import { ArrowRight, ShieldCheck, Sparkles, Tag } from "lucide-react"

const values = [
  {
    title: "Photography-forward listings",
    description: "We bias the layout toward large imagery and legible pricing so condition and detail stay obvious at a glance.",
  },
  {
    title: "Seller-friendly workflows",
    description: "Posting stays lightweight: upload, describe, publish. Updates sync instantly so buyers always see the latest.",
  },
  {
    title: "Buyer trust cues",
    description: "Ratings, save counts, and clear location chips help you decide quickly without noisy comment threads.",
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a local classifieds marketplace built for clear listings, honest photos, and fast conversations.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-[#e8ddd4]">
            <Link href="/classifieds">Browse ads</Link>
          </Button>
          <Button asChild className="rounded-full bg-[#1c1410] text-[#fff8f0] hover:bg-[#2a221c]">
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#e8ddd4] bg-[#fffdfb]/95 shadow-[0_24px_70px_rgba(50,32,24,0.06)]">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <Badge variant="secondary" className="rounded-full border border-[#e8ddd4] bg-[#faf4ec] text-[#5c4a42]">
              Why we exist
            </Badge>
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Classifieds should feel as considered as the goods on offer.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {SITE_CONFIG.name} started as a reaction to cluttered marketplaces and anonymous feeds. We wanted a slower, more legible
              surface where neighbors could list a desk, a camera, or a sublet without fighting the interface. The same care goes into buyer
              tools: saved searches, tidy messaging, and category pages that breathe.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-[#e8ddd4] bg-[#fffdfb]/90 transition-transform hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8ddd4] bg-[#faf4ec]">
                    {value.title.includes("Photography") ? (
                      <Sparkles className="h-4 w-4 text-[#7c6aa8]" />
                    ) : value.title.includes("Seller") ? (
                      <Tag className="h-4 w-4 text-[#7c6aa8]" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-[#7c6aa8]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#dcd0e5] bg-[linear-gradient(180deg,#f3edf8_0%,#ebe3f4_100%)] p-8 text-center sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7c6aa8]">Ready when you are</p>
        <h3 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-semibold text-[#2a1f2e] sm:text-3xl">
          Post your first ad in minutes, or browse what neighbors listed this week.
        </h3>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full bg-[#1c1410] text-[#fff8f0] hover:bg-[#2a221c]">
            <Link href="/register">
              Create free account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-[#cfc2ee] bg-white/80">
            <Link href="/classifieds">See live listings</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
