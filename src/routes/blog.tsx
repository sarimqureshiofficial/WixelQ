import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — WixelQ QR Code Insights, Marketing & Tech" },
      { name: "description", content: "Articles about QR codes, marketing strategies, business use cases, and modern web technology from the WixelQ team." },
      { property: "og:title", content: "WixelQ Blog" },
      { property: "og:description", content: "QR codes, marketing, business and technology insights." },
    ],
  }),
});

const POSTS = [
  {
    tag: "QR Codes",
    title: "10 creative ways to use QR codes in 2026",
    excerpt: "From restaurant menus to product packaging, discover how brands are turning QR codes into powerful customer touchpoints.",
    date: "July 1, 2026",
  },
  {
    tag: "Marketing",
    title: "How QR codes boost offline-to-online conversions",
    excerpt: "A practical guide to designing QR campaigns that actually get scanned — and drive measurable results.",
    date: "June 20, 2026",
  },
  {
    tag: "Business",
    title: "Digital business cards with vCard QR codes",
    excerpt: "Skip the paper. Learn how to create a scannable digital contact card in under a minute.",
    date: "June 8, 2026",
  },
  {
    tag: "Technology",
    title: "Static vs dynamic QR codes: what's the difference?",
    excerpt: "Understand when to use each — and why WixelQ focuses on high-quality static codes that never expire.",
    date: "May 28, 2026",
  },
  {
    tag: "QR Codes",
    title: "Designing beautiful QR codes with logos and gradients",
    excerpt: "Best practices for branded QR codes that stay scannable while looking premium.",
    date: "May 12, 2026",
  },
  {
    tag: "Marketing",
    title: "QR codes on packaging: the 2026 playbook",
    excerpt: "Turn every product into a channel — with tips on placement, size, and destination pages.",
    date: "April 30, 2026",
  },
];

function BlogPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Ideas, guides & QR code insights"
        description="Practical articles on QR codes, marketing, business and modern web technology."
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article key={p.title} className="glass group cursor-pointer rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-gradient-brand/10 px-2.5 py-1 font-medium text-primary">{p.tag}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {p.date}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold leading-snug group-hover:text-primary transition">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          More articles coming soon.
        </p>
      </section>
    </PageShell>
  );
}
