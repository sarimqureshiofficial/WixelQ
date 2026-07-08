import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check, Bell } from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/api")({
  component: ApiPage,
  head: () => ({
    meta: [
      { title: "WixelQ QR API — Coming Soon" },
      { name: "description", content: "The WixelQ QR API is coming soon. Join the waitlist to be the first to generate QR codes programmatically at scale." },
      { property: "og:title", content: "WixelQ API — Coming Soon" },
      { property: "og:description", content: "A developer API for beautiful QR codes at scale. Join the waitlist." },
    ],
  }),
});

function ApiPage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    setEmail("");
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Coming soon"
        title="WixelQ QR API"
        description="A blazing-fast, well-documented REST API to generate beautiful QR codes at scale. Launching soon."
      />
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="glass rounded-3xl p-8 md:p-12 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white ring-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-2xl font-semibold">Join the waitlist</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Get notified by email the moment the API opens. No spam, ever.
          </p>

          {joined ? (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Check className="h-4 w-4" /> You're on the list — we'll email you at launch.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full flex-1 rounded-full border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer"
              >
                <Bell className="h-4 w-4" /> Notify me
              </button>
            </form>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
            <Bullet title="REST API">Simple JSON endpoints for every QR type.</Bullet>
            <Bullet title="High volume">Built to scale from 10 to 10 million QR codes.</Bullet>
            <Bullet title="Full customization">Colors, gradients, logos, dot styles via API.</Bullet>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Full API documentation coming soon.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function Bullet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground">{children}</p>
    </div>
  );
}
