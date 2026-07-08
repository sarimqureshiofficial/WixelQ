import { useEffect } from "react";

export default function NativeAd() {
  useEffect(() => {
    if (document.getElementById("adsterra-native-script")) return;

    const script = document.createElement("script");
    script.id = "adsterra-native-script";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl30258151.effectivecpmnetwork.com/99ec00b8ae00b38bfc737ca7a10ce448/invoke.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 min-h-[100px] flex justify-center overflow-hidden">
      <div id="container-99ec00b8ae00b38bfc737ca7a10ce448"></div>
    </div>
  );
}
