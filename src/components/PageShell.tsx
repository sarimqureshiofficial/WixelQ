import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
        <div className="animate-float-slower absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl" style={{ background: "linear-gradient(135deg, oklch(0.75 0.14 220), oklch(0.65 0.18 295))" }} />
      </div>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 pb-8 md:pt-24 text-center">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.2em] text-primary/80">{eyebrow}</div>
      )}
      <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>}
    </section>
  );
}
