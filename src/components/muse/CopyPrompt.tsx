import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyPromptProps {
  prompt: string;
}

export const CopyPrompt: React.FC<CopyPromptProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = prompt;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          Prompt
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy prompt'}</span>
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words p-4 font-mono text-sm leading-relaxed text-zinc-200 sm:p-5">
        {prompt}
      </pre>
    </div>
  );
};
