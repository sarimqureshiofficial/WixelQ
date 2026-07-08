import { useEffect, useRef } from "react";

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent injecting multiple times
    if (!bannerRef.current || bannerRef.current.hasChildNodes()) return;

    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.innerHTML = `
      atOptions = {
        'key' : 'f6608585b685481fb269b9165b831fc5',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    bannerRef.current.appendChild(conf);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.highperformanceformat.com/f6608585b685481fb269b9165b831fc5/invoke.js";
    bannerRef.current.appendChild(script);
  }, []);

  return <div ref={bannerRef} className="mx-auto flex justify-center my-8 overflow-hidden min-h-[250px]" />;
}
