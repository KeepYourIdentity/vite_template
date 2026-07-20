import { Clock, Code2, Wrench } from "lucide-react";

import type { ReactElement } from "react";

export default function UnderConstruction(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-80 px-6 py-12 select-none">
      {/* Ikon utama + badge jam */}
      <div className="relative w-24 h-24 mb-6">
        <div className="w-24 h-24 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
          <Wrench size={38} strokeWidth={1.5} className="text-slate-500" />
        </div>
        <div className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
          <Clock size={13} strokeWidth={1.5} className="text-slate-500" />
        </div>
      </div>

      {/* Teks */}
      <p className="text-sm font-medium text-slate-800 mb-1.5 text-center">Halaman sedang dikembangkan</p>
      <p className="text-xs text-slate-600 text-center max-w-xs leading-relaxed mb-4">
        Konten untuk halaman ini belum tersedia. Akan segera hadir pada versi berikutnya.
      </p>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200 border border-slate-300">
        <Code2 size={12} strokeWidth={1.5} className="text-slate-500" />
        <span className="text-xs font-mono text-slate-500">under construction</span>
      </div>
    </div>
  );
}
