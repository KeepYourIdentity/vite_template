import { TriangleAlert } from "lucide-react";
import { useMemo } from "react";

import type { ReactElement, ReactNode } from "react";

interface SystemErrorProps {
  title?: ReactNode;
  message: ReactNode;
  rawError?: unknown;
}

export default function SystemError({
  title = "Terjadi Kesalahan",
  message,
  rawError,
}: SystemErrorProps): ReactElement {
  const parsedError = useMemo<string>(() => {
    if (!rawError) return "Detail error tidak diketahui";
    if (rawError instanceof Error) return rawError.stack || rawError.message;
    if (typeof rawError === "string") return rawError;
    try {
      return JSON.stringify(rawError, null, 2);
    } catch {
      return "Detail error tidak dapat di-parse menjadi teks.";
    }
  }, [rawError]);

  return (
    // Membungkus layar penuh dan menempatkan konten di tengah
    <div className="flex-1 min-h-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 font-sans text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 sm:p-8 border-t-4 border-red-500">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
          {/* <span>⚠️</span> Sistem Gagal Dimuat */}
          <TriangleAlert className="size-8" /> <span>{title}</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {/* Aplikasi tidak dapat berjalan karena ada kesalahan atau kekurangan pada konfigurasi <i>environment</i>. */}
          {message}
        </p>

        {/* Tampilkan detail error hanya jika di mode development */}
        {import.meta.env.DEV && parsedError && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-hidden">
            <strong className="block text-sm text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Detail Error (DEV Only):
            </strong>
            <div className="overflow-auto">
              {/* <pre className="text-red-500 text-sm font-mono">{JSON.stringify(errorDetails.format(), null, 2)}</pre> */}
              <pre className="text-red-500 text-sm font-mono">{parsedError}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
