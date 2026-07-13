import { GlobeOff } from "lucide-react";

import type { ReactElement } from "react";

export default function InternetLostUI(): ReactElement {
  return (
    <div className="flex-1 min-h-0 xy-center flex-col">
      <div className="relative w-12 h-12 mb-4">
        <GlobeOff className="absolute inset-0 size-full text-gray-500" />
      </div>
      <div className="xy-center flex-col text-slate-600">
        <p className="text-lg font-semibold tracking-wide">Gagal Memuat Halaman</p>
        <p>Periksa internet atau perangkat anda</p>
        <p>Hubungi pihak pengembang untuk informasi lebih lanjut</p>
      </div>
    </div>
  );
}
