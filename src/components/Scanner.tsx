import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

export default function Scanner({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let stream: MediaStream | null = null;
    let detector: any = null;
    let raf = 0;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        // @ts-ignore BarcodeDetector may not exist
        if ("BarcodeDetector" in window) {
          // @ts-ignore
          detector = new window.BarcodeDetector({ formats: ["qr_code"] });
          const scan = async () => {
            if (!videoRef.current) return;
            try {
              const codes = await detector.detect(videoRef.current);
              if (codes[0]?.rawValue) { setResult(codes[0].rawValue); return; }
            } catch {}
            raf = requestAnimationFrame(scan);
          };
          scan();
        } else {
          setError("QR scanning not supported in this browser. Try Chrome on Android or Safari on iOS.");
        }
      } catch (e: any) {
        setError(e?.message || "Camera access denied.");
      }
    })();
    return () => {
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      setResult(null); setError(null);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="glass w-full max-w-md rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold"><Camera className="h-4 w-4" /> Scan QR</h3>
          <button onClick={onClose} className="rounded-full border border-border p-1.5"><X className="h-4 w-4" /></button>
        </div>
        <div className="aspect-square overflow-hidden rounded-2xl bg-black">
          <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
        </div>
        {result && (
          <div className="mt-3 rounded-xl border border-border bg-card p-3 text-sm">
            <div className="mb-1 text-xs text-muted-foreground">Result</div>
            <div className="break-all">{result}</div>
            {/^https?:\/\//.test(result) && (
              <a href={result} target="_blank" rel="noreferrer" className="mt-2 inline-block text-primary hover:underline">Open link →</a>
            )}
          </div>
        )}
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
