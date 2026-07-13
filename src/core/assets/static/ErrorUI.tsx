import { TriangleAlert } from "lucide-react";
import { useMemo } from "react";

import type { ReactElement, ReactNode } from "react";

interface ErrorUIProps {
  title?: ReactNode;
  message: ReactNode;
  rawError?: unknown;
}

// Fungsi helper untuk menghasilkan format YYYYMMDD-HHmm
const getFormattedLogName = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const date = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");

  return `Error_${year}${month}${date}-${hours}${mins}.log`;
};

export default function ErrorUI({
  title = "Terjadi Kesalahan",
  message,
  rawError,
}: ErrorUIProps): ReactElement {
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

  // Menggunakan useMemo agar nama file log konstan per sesi error (tidak berubah setiap detik/menit saat render ulang)
  const logFileName = useMemo(() => getFormattedLogName(), []);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 sm:p-8 border-t-4 border-red-500">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-2 flex items-center gap-3">
          <TriangleAlert className="size-8" /> <span>{title}</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>

        {import.meta.env.DEV && parsedError && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
            <strong className="block text-sm text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Detail Error (DEV Only):
            </strong>
            <div className="overflow-auto">
              <pre className="text-red-500 text-sm font-mono">{parsedError}</pre>
            </div>
          </div>
        )}
        {import.meta.env.PROD && ( //TODO: buat jadi lebih friendly di orang biasa
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
            <strong className="block text-sm text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Kami akan sangat menghargai jika anda berkenan untuk mengirimkan file{" "}
              <span className="rounded p-1 bg-red-300 text-red-500 normal-case font-mono">{logFileName}</span> kepada
              kami para pengembang website ini
            </strong>
          </div>
        )}
      </div>
      {/* <footer className="w-full h-auto py-1 px-2 flex flex-row justify-center gap-2">
        <p className="text-slate-990 font-bold uppercase text-center w-fit rounded">
          Copyright &copy; {new Date().getFullYear()} PT. Inti Sistem Sarana Sejahtera.
        </p>
        <p className="text-slate-990 font-bold text-center w-fit rounded">All rights reserved.</p>
      </footer> */}
    </div>
  );
}
