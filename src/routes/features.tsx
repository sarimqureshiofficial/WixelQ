import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Infinity as InfinityIcon, UserX, Palette, Download, Shield, Smartphone, Zap, Sparkles,
  QrCode, Wifi, Contact, FileText, Image as ImageIcon, MapPin, Calendar,
} from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: "Features — WixelQ Free QR Code Generator" },
      { name: "description", content: "Explore every feature of WixelQ: unlimited free QR codes, custom colors, gradients, logos, HD PNG/SVG/PDF downloads, WiFi, vCard, WhatsApp and 20+ categories." },
      { property: "og:title", content: "WixelQ Features" },
      { property: "og:description", content: "Everything WixelQ offers for creating beautiful QR codes free." },
    ],
  }),
});

const CORE = [
  { icon: InfinityIcon, title: "Unlimited Free QR Codes", desc: "No daily caps, no paywalls, no hidden costs." },
  { icon: UserX, title: "No Signup Required", desc: "Start generating instantly — no account needed." },
  { icon: Palette, title: "Full Design Control", desc: "Solid or gradient colors, dot styles, eye styles, rounded corners." },
  { icon: Download, title: "HD Downloads", desc: "Export PNG, JPG, SVG (vector), and print-ready PDF." },
  { icon: Shield, title: "Private & Secure", desc: "Everything is generated locally in your browser." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Create on desktop, phone, or tablet." },
  { icon: Zap, title: "Live Preview", desc: "See changes in real time as you customize." },
  { icon: Sparkles, title: "Custom Logo", desc: "Add your brand logo or icon to the center." },
];

const TYPES = [
  { icon: QrCode, title: "Website URLs" },
  { icon: Wifi, title: "WiFi Access" },
  { icon: Contact, title: "vCard Contacts" },
  { icon: FileText, title: "PDF Documents" },
  { icon: ImageIcon, title: "Image Links" },
  { icon: MapPin, title: "Locations" },
  { icon: Calendar, title: "Events" },
  { icon: Sparkles, title: "Social Media" },
];

function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title="Everything you need to build beautiful QR codes"
        description="A complete free toolkit — powerful customization, unlimited exports, and 20+ QR types built for real brands."
      />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORE.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white ring-glow">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Supported QR types</h2>
        <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4">
          {TYPES.map(({ icon: Icon, title }) => (
            <div key={title} className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <div className="glass rounded-3xl p-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to create yours?</h2>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer">
            <QrCode className="h-4 w-4" /> Open Generator
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
