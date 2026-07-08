import { useEffect, useMemo, useRef, useState } from "react";
import QRCodeStyling, {
  type Options as QROptions,
  type DotType,
  type CornerSquareType,
} from "qr-code-styling";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link as LinkIcon, Type, Mail, Phone, MessageSquare, MessageCircle, Wifi,
  Contact, MapPin, Calendar, FileText, Image as ImageIcon, Share2,
  Smartphone, Youtube, Instagram, Facebook, Twitter, Linkedin, Sparkles,
  Download, Copy, Printer, History, Trash2, Upload,
} from "lucide-react";

type CategoryId =
  | "url" | "text" | "email" | "phone" | "sms" | "whatsapp" | "wifi"
  | "vcard" | "location" | "event" | "pdf" | "image" | "social"
  | "appstore" | "youtube" | "instagram" | "facebook" | "twitter"
  | "linkedin" | "custom";

const CATEGORIES: { id: CategoryId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "url", label: "Website", icon: LinkIcon },
  { id: "text", label: "Text", icon: Type },
  { id: "email", label: "Email", icon: Mail },
  { id: "phone", label: "Phone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageSquare },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "vcard", label: "vCard", icon: Contact },
  { id: "location", label: "Location", icon: MapPin },
  { id: "event", label: "Event", icon: Calendar },
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "image", label: "Image URL", icon: ImageIcon },
  { id: "social", label: "Social", icon: Share2 },
  { id: "appstore", label: "App Store", icon: Smartphone },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "twitter", label: "X / Twitter", icon: Twitter },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "custom", label: "Custom", icon: Sparkles },
];

const DOT_STYLES: DotType[] = ["square", "rounded", "dots", "classy", "classy-rounded", "extra-rounded"];
const EYE_STYLES: CornerSquareType[] = ["square", "dot", "extra-rounded"];
const ECC: ("L" | "M" | "Q" | "H")[] = ["L", "M", "Q", "H"];

type Fields = Record<string, string>;

function buildData(cat: CategoryId, f: Fields): string {
  switch (cat) {
    case "url": return f.url || "";
    case "text": return f.text || "";
    case "email": return `mailto:${f.email || ""}?subject=${encodeURIComponent(f.subject || "")}&body=${encodeURIComponent(f.body || "")}`;
    case "phone": return `tel:${f.phone || ""}`;
    case "sms": return `SMSTO:${f.phone || ""}:${f.message || ""}`;
    case "whatsapp": return `https://wa.me/${(f.phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(f.message || "")}`;
    case "wifi": return `WIFI:T:${f.encryption || "WPA"};S:${f.ssid || ""};P:${f.password || ""};H:${f.hidden === "true" ? "true" : "false"};;`;
    case "vcard":
      return `BEGIN:VCARD\nVERSION:3.0\nN:${f.lastName || ""};${f.firstName || ""}\nFN:${f.firstName || ""} ${f.lastName || ""}\nORG:${f.org || ""}\nTEL:${f.phone || ""}\nEMAIL:${f.email || ""}\nURL:${f.url || ""}\nEND:VCARD`;
    case "location": return `geo:${f.lat || "0"},${f.lng || "0"}`;
    case "event":
      return `BEGIN:VEVENT\nSUMMARY:${f.title || ""}\nLOCATION:${f.location || ""}\nDTSTART:${(f.start || "").replace(/[-:]/g, "")}\nDTEND:${(f.end || "").replace(/[-:]/g, "")}\nEND:VEVENT`;
    case "pdf":
    case "image":
    case "appstore":
    case "youtube":
    case "instagram":
    case "facebook":
    case "twitter":
    case "linkedin":
    case "social":
    case "custom":
      return f.url || "";
  }
}

const FIELDS: Record<CategoryId, { key: string; label: string; type?: string; placeholder?: string }[]> = {
  url: [{ key: "url", label: "Website URL", placeholder: "https://example.com" }],
  text: [{ key: "text", label: "Text", placeholder: "Any text..." }],
  email: [
    { key: "email", label: "Email", type: "email", placeholder: "hello@example.com" },
    { key: "subject", label: "Subject" },
    { key: "body", label: "Message" },
  ],
  phone: [{ key: "phone", label: "Phone", type: "tel", placeholder: "+1234567890" }],
  sms: [
    { key: "phone", label: "Phone", type: "tel" },
    { key: "message", label: "Message" },
  ],
  whatsapp: [
    { key: "phone", label: "Phone (with country code)", type: "tel" },
    { key: "message", label: "Message" },
  ],
  wifi: [
    { key: "ssid", label: "Network name (SSID)" },
    { key: "password", label: "Password" },
    { key: "encryption", label: "Encryption (WPA/WEP/nopass)", placeholder: "WPA" },
  ],
  vcard: [
    { key: "firstName", label: "First name" },
    { key: "lastName", label: "Last name" },
    { key: "org", label: "Organization" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "url", label: "Website" },
  ],
  location: [
    { key: "lat", label: "Latitude" },
    { key: "lng", label: "Longitude" },
  ],
  event: [
    { key: "title", label: "Event title" },
    { key: "location", label: "Location" },
    { key: "start", label: "Start (YYYYMMDDTHHMMSS)" },
    { key: "end", label: "End (YYYYMMDDTHHMMSS)" },
  ],
  pdf: [{ key: "url", label: "PDF URL", placeholder: "https://.../file.pdf" }],
  image: [{ key: "url", label: "Image URL" }],
  social: [{ key: "url", label: "Profile URL" }],
  appstore: [{ key: "url", label: "App Store / Play URL" }],
  youtube: [{ key: "url", label: "YouTube URL" }],
  instagram: [{ key: "url", label: "Instagram URL" }],
  facebook: [{ key: "url", label: "Facebook URL" }],
  twitter: [{ key: "url", label: "X / Twitter URL" }],
  linkedin: [{ key: "url", label: "LinkedIn URL" }],
  custom: [{ key: "url", label: "Any URL or data" }],
};

type HistoryItem = { id: string; category: CategoryId; data: string; label: string; createdAt: number };

export default function QRGenerator() {
  const [category, setCategory] = useState<CategoryId>("url");
  const [fields, setFields] = useState<Fields>({ url: "https://wixelq.com" });
  const [fg, setFg] = useState("#0f1226");
  const [bg, setBg] = useState("#ffffff");
  const [dotStyle, setDotStyle] = useState<DotType>("rounded");
  const [eyeStyle, setEyeStyle] = useState<CornerSquareType>("extra-rounded");
  const [useGradient, setUseGradient] = useState(true);
  const [grad1, setGrad1] = useState("#4f46e5");
  const [grad2, setGrad2] = useState("#22d3ee");
  const [size, setSize] = useState(360);
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("Q");
  const [logo, setLogo] = useState<string | undefined>();
  const [label, setLabel] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  const data = useMemo(() => buildData(category, fields) || " ", [category, fields]);

  const options: QROptions = useMemo(() => ({
    width: size,
    height: size,
    type: "svg",
    data,
    image: logo,
    margin: 8,
    qrOptions: { errorCorrectionLevel: ecc },
    imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.32 },
    dotsOptions: {
      type: dotStyle,
      color: useGradient ? undefined : fg,
      gradient: useGradient
        ? { type: "linear", rotation: 0.7, colorStops: [{ offset: 0, color: grad1 }, { offset: 1, color: grad2 }] }
        : undefined,
    },
    backgroundOptions: { color: bg },
    cornersSquareOptions: { type: eyeStyle, color: useGradient ? grad1 : fg, gradient: undefined },
    cornersDotOptions: { type: "dot", color: useGradient ? grad2 : fg, gradient: undefined },
  }), [size, data, logo, ecc, useGradient, dotStyle, grad1, grad2, fg, bg, eyeStyle]);

  // Create the instance once
  useEffect(() => {
    if (qrRef.current) return;
    qrRef.current = new QRCodeStyling(options);
    if (ref.current) {
      ref.current.innerHTML = "";
      qrRef.current.append(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-append if the container node changes (e.g. after animation/remount)
  useEffect(() => {
    const node = ref.current;
    if (!node || !qrRef.current) return;
    if (node.childElementCount === 0) {
      qrRef.current.append(node);
    }
  });

  // Update whenever options change — live preview
  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.update(options);
  }, [options]);

  const resetDesign = () => {
    setFg("#000000"); setBg("#ffffff");
    setUseGradient(false);
    setGrad1("#4f46e5"); setGrad2("#22d3ee");
    setDotStyle("square"); setEyeStyle("square");
    setEcc("Q"); setSize(360); setLogo(undefined);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wixelq_history");
      if (raw) setHistory(JSON.parse(raw));
      const saved = localStorage.getItem("wixelq_settings");
      if (saved) {
        const s = JSON.parse(saved);
        setFg(s.fg ?? fg); setBg(s.bg ?? bg); setDotStyle(s.dotStyle ?? dotStyle);
        setEyeStyle(s.eyeStyle ?? eyeStyle); setUseGradient(s.useGradient ?? useGradient);
        setGrad1(s.grad1 ?? grad1); setGrad2(s.grad2 ?? grad2);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const s = { fg, bg, dotStyle, eyeStyle, useGradient, grad1, grad2 };
    localStorage.setItem("wixelq_settings", JSON.stringify(s));
  }, [fg, bg, dotStyle, eyeStyle, useGradient, grad1, grad2]);

  const download = (ext: "png" | "jpeg" | "svg" | "webp") => {
    qrRef.current?.download({ name: `wixelq-${Date.now()}`, extension: ext as "png" });
    const item: HistoryItem = { id: crypto.randomUUID(), category, data, label: label || fields.url || fields.text || category, createdAt: Date.now() };
    const next = [item, ...history].slice(0, 24);
    setHistory(next);
    localStorage.setItem("wixelq_history", JSON.stringify(next));
  };

  const downloadPDF = async () => {
    const blob = await qrRef.current?.getRawData("png");
    if (!blob) return;
    const url = URL.createObjectURL(blob as Blob);
    const w = window.open("");
    if (!w) return;
    w.document.write(`<html><head><title>Print QR</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh"><img src="${url}" style="max-width:80vmin"/></body></html>`);
  };

  const copyImage = async () => {
    try {
      const blob = await qrRef.current?.getRawData("png");
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob as Blob })]);
    } catch {}
  };

  const share = async () => {
    try {
      const blob = await qrRef.current?.getRawData("png");
      if (!blob) return;
      const file = new File([blob as Blob], "wixelq.png", { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "QR Code" });
      }
    } catch {}
  };

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const currentFields = FIELDS[category];

  return (
    <div id="generator" className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3" /> Free forever · No signup · No watermark
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
          Design your <span className="text-gradient">QR</span> in real time
        </h2>
      </div>

      {/* Category chips */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setCategory(id); setFields({}); }}
            className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all ${
              category === id
                ? "border-transparent bg-gradient-brand text-white ring-glow"
                : "border-border bg-card/60 hover:border-primary/40 hover:-translate-y-0.5"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr_1fr]">
        {/* Left: content fields */}
        <motion.section layout className="glass rounded-3xl p-6">
          <h3 className="mb-4 text-lg font-semibold">Content</h3>
          <div className="space-y-3">
            {currentFields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">{f.label}</span>
                <input
                  type={f.type || "text"}
                  placeholder={f.placeholder}
                  value={fields[f.key] || ""}
                  onChange={(e) => setFields({ ...fields, [f.key]: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background/60 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
                />
              </label>
            ))}
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Custom label (optional)</span>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Scan me"
                className="w-full rounded-xl border border-input bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </label>
          </div>
        </motion.section>

        {/* Middle: preview */}
        <section className="relative flex flex-col items-center justify-center">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          </div>
          <motion.div
            initial={{ scale: 0.96, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="glass rounded-3xl p-6"
          >
            <div ref={ref} className="rounded-2xl overflow-hidden flex items-center justify-center" style={{ minHeight: 200 }} />
            {label && (
              <p className="mt-3 text-center text-sm font-medium text-foreground/80">{label}</p>
            )}
          </motion.div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button onClick={() => download("png")} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-medium text-white ring-glow transition hover:brightness-110">
              <Download className="h-4 w-4" /> PNG
            </button>
            <button onClick={() => download("jpeg")} className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm hover:border-primary/40">JPG</button>
            <button onClick={() => download("svg")} className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm hover:border-primary/40">SVG</button>
            <button onClick={downloadPDF} className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm hover:border-primary/40">PDF / Print</button>
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={copyImage} title="Copy" className="rounded-full border border-border bg-card/60 p-2 hover:border-primary/40"><Copy className="h-4 w-4" /></button>
            <button onClick={share} title="Share" className="rounded-full border border-border bg-card/60 p-2 hover:border-primary/40"><Share2 className="h-4 w-4" /></button>
            <button onClick={downloadPDF} title="Print" className="rounded-full border border-border bg-card/60 p-2 hover:border-primary/40"><Printer className="h-4 w-4" /></button>
          </div>
        </section>

        {/* Right: customize */}
        <section className="glass rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Design</h3>
            <button onClick={resetDesign} className="text-xs rounded-full border border-border bg-card/60 px-3 py-1 hover:border-primary/40">Reset</button>
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Gradient fill</span>
              <input type="checkbox" checked={useGradient} onChange={(e) => setUseGradient(e.target.checked)} className="accent-primary" />
            </label>
            <AnimatePresence mode="wait">
              {useGradient ? (
                <motion.div key="grad" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <ColorInput label="From" value={grad1} onChange={setGrad1} />
                  <ColorInput label="To" value={grad2} onChange={setGrad2} />
                </motion.div>
              ) : (
                <motion.div key="solid" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                  <ColorInput label="QR color" value={fg} onChange={setFg} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ColorInput label="Background" value={bg} onChange={setBg} />

          <SelectRow label="Dot style" value={dotStyle} onChange={(v) => setDotStyle(v as DotType)} options={DOT_STYLES} />
          <SelectRow label="Eye style" value={eyeStyle} onChange={(v) => setEyeStyle(v as CornerSquareType)} options={EYE_STYLES} />
          <SelectRow label="Error correction" value={ecc} onChange={(v) => setEcc(v as "L")} options={ECC} />

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Size: {size}px</label>
            <input type="range" min={200} max={800} step={20} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-primary" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Center logo</label>
            <div className="flex items-center gap-2">
              <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 px-3 py-2 text-sm hover:border-primary/40">
                <Upload className="h-4 w-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={onLogo} />
              </label>
              {logo && (
                <button onClick={() => setLogo(undefined)} className="rounded-xl border border-border p-2 hover:border-destructive"><Trash2 className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        </section>
      </div>

      {history.length > 0 && (
        <div className="mt-12">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold"><History className="h-4 w-4" /> Recent</h3>
            <button onClick={() => { setHistory([]); localStorage.removeItem("wixelq_history"); }} className="text-xs text-muted-foreground hover:text-destructive">Clear</button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {history.map((h) => (
              <button key={h.id} onClick={() => { setCategory(h.category); setFields({ url: h.data, text: h.data }); }} className="glass truncate rounded-xl p-3 text-left text-xs hover:-translate-y-0.5 transition">
                <div className="font-medium truncate">{h.label}</div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-wide">{h.category}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex-1">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background/60 px-2 py-1.5">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
      </div>
    </label>
  );
}

function SelectRow({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-input bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
