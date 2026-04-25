import React from 'react';

export default function SiteFooter({ className = 'mt-16' }) {
  return (
    <footer className={`${className} border-t border-[#e1dfd7] bg-white px-5 py-10 md:px-8`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[14px] text-[#4f565f]">Acoustic office pods for calls, focus, and meetings</p>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7a8086]">© 2026 AcePods</p>
          <a
            href="https://aceofficepods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium text-[#7a8086] transition-colors hover:text-[#1e2227]"
          >
            Owned by Ace Workplace Solutions (Ace Office Pods Malaysia) - 202403171118
          </a>
        </div>
      </div>
    </footer>
  );
}
