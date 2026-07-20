import type { ReactElement, ReactNode } from "react";

export interface ChartCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Kartu pembungkus chart: border tipis, judul rata tengah --
 * meniru tampilan pada gambar referensi. Mendukung dark mode lewat
 * className `dark:`.
 *
 * @example
 * <ChartCard
 *   title="Pertumbuhan Kredit"
 * >
 *   <div className="h-72 w-full sm:h-80 lg:h-96">
 *     <Line chartData={chartData} chartOptions={chartOptions} />
 *   </div>
 * </ChartCard>
 */
export default function ChartCard({
  title,
  action, // bisa diabaikan jika tidak ada kebutuhan tombol khusus yang ditaruh di pojok kanan atas ChartCard
  children,
}: ChartCardProps): ReactElement {
  return (
    <section className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <span />
        <h2 className="text-center text-sm font-medium text-gray-700 sm:text-base dark:text-gray-200">{title}</h2>
        <div className="flex justify-end">{action}</div>
      </div>
      {children}
    </section>
  );
}
