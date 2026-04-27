"use client";
import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Use native share if available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `شاهد ${title} على سينما ماكس`,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or error, fall through to copy
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Final fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
        copied
          ? "bg-green-600 text-white"
          : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          تم النسخ!
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          مشاركة
        </>
      )}
    </button>
  );
}
