import React from 'react';
import SubpageHeader from './SubpageHeader';

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1a1a1a]">
      <SubpageHeader />

      <main>{children}</main>

      <footer className="mt-16 border-t border-[#e1dfd7] bg-white px-5 py-10 md:px-8">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-[#4f565f]">Acoustic office pods for calls, focus, and meetings</p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7a8086]">© 2026 AcePods</p>
        </div>
      </footer>
    </div>
  );
}
