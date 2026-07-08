import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, ScanLine, Copy, ExternalLink, Check } from "lucide-react";
import PageShell, { PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/scanner")({
  component: ScannerPage,
  head: () => ({
    meta: [
      { title: "QR Code Scanner — WixelQ" },
      { name: "description", content: "Scan any QR code instantly with your device camera. Free, private, and works right in your browser." },
      { property: "og:title", content: "QR Code Scanner — WixelQ" },
      { property: "og:description", content: "Scan QR codes with your camera — free and private." },
    ],
  }),
});

function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!active) return;
    let stream: MediaStream | null = null;
    let detector: any = null;
    let raf = 0;
    setResult(null);
    setError(null);
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        // @ts-ignore
        if ("BarcodeDetector" in window) {
          // @ts-ignore
          detector = new window.BarcodeDetector({ formats: ["qr_code"] });
          const scan = async () => {
            if (!videoRef.current) return;
            try {
              const codes = await detector.detect(videoRef.current);
              if (codes[0]?.rawValue) {
                setResult(codes[0].rawValue);
                setActive(false);
                return;
              }
            } catch {}
            raf = requestAnimationFrame(scan);
          };
          scan();
        } else {
          setError("QR scanning isn't supported in this browser. Try Chrome on Android or Safari on iOS.");
        }
      } catch (e: any) {
        setError(e?.message || "Camera access denied.");
      }
    })();
    return () => {
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [active]);

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isUrl = result && /^https?:\/\//i.test(result);

  return (
    <PageShell>
      <PageHero
        eyebrow="Scanner"
        title="Scan any QR code"
        description="Point your camera at a QR code — everything runs locally in your browser for full privacy."
      />
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="glass rounded-3xl p-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            {!active && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 text-white">
                <Camera className="h-8 w-8" />
                <p className="text-sm text-white/80">Camera off</p>
              </div>
            )}
            {active && (
              <div className="pointer-events-none absolute inset-8 rounded-2xl border-2 border-white/70" />
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <div className="text-xs font-medium text-primary">Scan result</div>
              <div className="mt-1 break-all text-sm text-foreground">{result}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs hover:border-primary/40 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                {isUrl && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1.5 text-xs font-medium text-white cursor-pointer hover:brightness-110"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open link
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setActive((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white ring-glow hover:brightness-110 transition cursor-pointer"
            >
              <ScanLine className="h-4 w-4" />
              {active ? "Stop scanning" : "Start scanning"}
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
