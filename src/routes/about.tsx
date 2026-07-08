import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Sparkles, Cpu, ShieldCheck, QrCode } from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About WixelQ — Our Mission" },
      { name: "description", content: "WixelQ is a premium, completely free QR code generator built for creators, marketers, and businesses. Learn our mission and the technology behind it." },
      { property: "og:title", content: "About WixelQ" },
      { property: "og:description", content: "The story and mission behind WixelQ — a free, premium QR code generator." },
    ],
  }),
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="A premium QR generator that's free for everyone"
        description="WixelQ was built to make beautiful, high-quality QR codes accessible without paywalls, signups, or watermarks."
      />
      <section className="mx-auto max-w-4xl px-4 py-10 space-y-6 text-muted-foreground">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-foreground">What is WixelQ?</h2>
          <p className="mt-2 text-sm leading-relaxed">
            WixelQ is a fast, modern, browser-based QR code generator supporting 20+ QR types —
            websites, WiFi, WhatsApp, vCards, PDFs, social media links, and more. Everything runs
            locally in your browser, so your data never leaves your device.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card icon={Target} title="Our mission">
            Make premium QR code design free, fast, and available to every creator and business —
            without hidden fees, ads, or watermarks.
          </Card>
          <Card icon={Heart} title="Why choose WixelQ">
            Elegant design, real-time previews, HD exports, and thoughtful customization built for
            brands that care about polish.
          </Card>
          <Card icon={Cpu} title="Technology">
            Built with React, TanStack Start, Tailwind CSS, and modern QR generation libraries.
            Optimized for speed, accessibility, and SEO.
          </Card>
          <Card icon={ShieldCheck} title="Privacy first">
            No tracking of QR content. Everything you type is processed in your browser — never
            uploaded to a server.
          </Card>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Benefits at a glance
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            <li>• Unlimited free QR codes</li>
            <li>• No signup, ever</li>
            <li>• No watermark on downloads</li>
            <li>• HD PNG / JPG / SVG / PDF exports</li>
            <li>• 20+ QR types supported</li>
            <li>• Works on desktop &amp; mobile</li>
          </ul>
        </div>

        <div className="text-center pt-6">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer">
            <QrCode className="h-4 w-4" /> Try the Generator
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white ring-glow">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  );
}
