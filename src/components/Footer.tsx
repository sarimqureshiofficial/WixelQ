import { Link } from "@tanstack/react-router";
import { QrCode, Twitter, Linkedin, Github, Facebook } from "lucide-react";

const SOCIALS = [
  { icon: Twitter, href: "https://twitter.com", label: "X" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

type LinkItem = { label: string; to?: string; href?: string };

const COLS: { title: string; links: LinkItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Generator", to: "/" },
      { label: "Scanner", to: "/scanner" },
      { label: "Features", to: "/features" },
      { label: "QR API — Coming soon", to: "/api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-8">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <QrCode className="h-4 w-4" />
            </span>
            WixelQ
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">The premium free QR code generator.</p>
          <div className="mt-4 flex gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <div className="font-semibold text-sm">{col.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) =>
                l.to ? (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="cursor-pointer transition-colors duration-200 hover:text-foreground"
                      activeProps={{ className: "text-foreground font-medium" }}
                      activeOptions={{ exact: true }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.label}>
                    <a href={l.href} className="cursor-pointer transition-colors duration-200 hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} WixelQ. All Rights Reserved.
      </div>
    </footer>
  );
}
