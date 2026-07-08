import { Link } from "@tanstack/react-router";
import { QrCode, ScanLine } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-white ring-glow">
            <QrCode className="h-4 w-4" />
          </span>
          <span className="text-lg tracking-tight">WixelQ</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/features" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Features</Link>
          <Link to="/about" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>About</Link>
          <Link to="/blog" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Blog</Link>
          <Link to="/contact" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Contact</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/scanner" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm hover:border-primary/40 cursor-pointer">
            <ScanLine className="h-4 w-4" /> Scan
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer">
            Generate
          </Link>
        </div>
      </nav>
    </header>
  );
}
