 "use client";

import Link from "next/link";
import { Globe, Mail, MapPin, Phone, Tag } from "lucide-react";
import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { SitePost } from "@/lib/site-connector";
import type { TaskKey } from "@/lib/site-config";

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey;
  taskLabel: string;
  taskRoute: string;
  post: SitePost;
  description: string;
  category: string;
  images: string[];
  mapEmbedUrl: string | null;
  related: SitePost[];
}) {
  const content =
    post.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  const location =
    typeof content.address === "string"
      ? content.address
      : typeof content.location === "string"
        ? content.location
        : "";
  const website = typeof content.website === "string" ? content.website : "";
  const phone = typeof content.phone === "string" ? content.phone : "";
  const email = typeof content.email === "string" ? content.email : "";
  const highlights = Array.isArray(content.highlights)
    ? content.highlights.filter((item): item is string => typeof item === "string")
    : [];
  const descriptionHtml = formatRichHtml(description, "Details coming soon.");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": task === "profile" ? "Organization" : "LocalBusiness",
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  };

  return (
    <div className="min-h-screen bg-[#ececec] text-slate-900">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>&gt;</span>
          <Link href={taskRoute} className="hover:text-slate-900">
            {taskLabel}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800">{post.title}</span>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
            <Button variant="secondary" className="w-full md:w-auto">
              Check with seller
            </Button>
          </div>

          <div className="rounded-md border border-slate-300 bg-slate-100 p-4 text-sm">
            <p>
              <span className="font-semibold">Location:</span> {location || "Not specified"}
            </p>
          </div>

          <div className="rounded-sm border-2 border-slate-800 bg-white p-2">
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-200">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(images[0] || null)}
                    className="h-full w-full cursor-zoom-in"
                    aria-label="Open image"
                  >
                    <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none" showCloseButton>
                  <DialogTitle className="sr-only">{post.title} image preview</DialogTitle>
                  {selectedImage ? (
                    <div className="relative h-[75vh] w-full overflow-hidden rounded-lg border border-slate-300 bg-black/90">
                      <ContentImage src={selectedImage} alt={post.title} fill className="object-contain" />
                    </div>
                  ) : null}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {images.slice(1, 6).map((image) => (
                <div key={image} className="relative h-20 overflow-hidden border border-slate-300 bg-white">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="h-full w-full cursor-zoom-in"
                        aria-label="Open thumbnail image"
                      >
                        <ContentImage src={image} alt={post.title} fill className="object-cover" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none" showCloseButton>
                      <DialogTitle className="sr-only">{post.title} image preview</DialogTitle>
                      {selectedImage ? (
                        <div className="relative h-[75vh] w-full overflow-hidden rounded-lg border border-slate-300 bg-black/90">
                          <ContentImage src={selectedImage} alt={post.title} fill className="object-contain" />
                        </div>
                      ) : null}
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-md border border-slate-300 bg-white p-5">
            <RichContent html={descriptionHtml} className="max-w-none text-[1.05rem] leading-8 text-slate-800" />
          </div>

          <div className="rounded-md border border-slate-300 bg-white p-5">
            <h2 className="text-lg font-semibold">Useful information</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {location ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{location}</span>
                </li>
              ) : null}
              {phone ? (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </li>
              ) : null}
              {email ? (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{email}</span>
                </li>
              ) : null}
              {website ? (
                <li className="flex items-start gap-2">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0" />
                  <a href={website} target="_blank" rel="noreferrer" className="break-all underline">
                    {website}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          {highlights.length ? (
            <div className="rounded-md border border-slate-300 bg-white p-5">
              <h2 className="text-lg font-semibold">Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {mapEmbedUrl ? (
            <div className="rounded-md border border-slate-300 bg-white p-4">
              <p className="text-sm font-semibold">Location map</p>
              <div className="mt-3 overflow-hidden border border-slate-300">
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ) : null}
        </section>

        {related.length ? (
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">More in {category || taskLabel}</h2>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
