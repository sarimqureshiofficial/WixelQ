import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact WixelQ — Get in Touch" },
      { name: "description", content: "Have a question, feedback, or partnership idea? Send WixelQ a message and we'll get back to you." },
      { property: "og:title", content: "Contact WixelQ" },
      { property: "og:description", content: "Get in touch with the WixelQ team." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Questions, feedback, or ideas? Drop us a message — we read every one."
      />
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white ring-glow">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">hello@wixelq.com</p>
            </div>
            <div className="glass rounded-2xl p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white ring-glow">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">Support</h3>
              <p className="mt-1 text-sm text-muted-foreground">We typically reply within 24 hours.</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass rounded-2xl p-6 space-y-4">
            {sent && (
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
                <Check className="h-4 w-4" /> Message sent — we'll get back to you soon.
              </div>
            )}
            <Field label="Name" required>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
              />
            </Field>
            <Field label="Email" required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
              />
            </Field>
            <Field label="Subject" required>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
              />
            </Field>
            <Field label="Message" required>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
              />
            </Field>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer"
            >
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </div>
      {children}
    </label>
  );
}
