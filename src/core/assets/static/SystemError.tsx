import type { ZodError } from "zod";

interface SystemErrorProps {
  errorDetails: ZodError | null;
}

export default function SystemError({ errorDetails }: SystemErrorProps) {
  return (
    // Membungkus layar penuh dan menempatkan konten di tengah
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-gray-800">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6 sm:p-8 border-t-4 border-red-500">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2 flex items-center gap-2">
          <span>⚠️</span> Sistem Gagal Dimuat
        </h1>

        <p className="text-gray-600 mb-6">
          Aplikasi tidak dapat berjalan karena ada kesalahan atau kekurangan pada konfigurasi <i>environment</i>.
        </p>

        {/* Tampilkan detail error hanya jika di mode development */}
        {import.meta.env.DEV && errorDetails && (
          <div className="bg-gray-100 rounded-md p-4 overflow-hidden">
            <strong className="block text-sm text-gray-700 mb-2 uppercase tracking-wide">Log Validasi Zod:</strong>
            <div className="overflow-x-auto">
              <pre className="text-red-500 text-sm font-mono">{JSON.stringify(errorDetails.format(), null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
