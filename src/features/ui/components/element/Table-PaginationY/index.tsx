import { Skeleton } from "core/assets/static/";
import { SearchX } from "lucide-react";
import Button from "ui/components/element/Button";
import { usePaginationTableY } from "./useIndex";

import type { ReactNode } from "react";
import type { ITableProps } from "./index.types";

export default function PaginatedTableY<T = unknown>({
  total,
  current,
  onChange,
  contentHeader = [],
  contentData = [],
  tableContainerRef,
  isLoading = false,
  specialKey,
  tableListColor = () => "hover:bg-blue",
  needPagination = true,
}: ITableProps<T>) {
  const { hasData, pages, safeHeaders } = usePaginationTableY(total, current, contentHeader, contentData);
  const safeSpecialKey = specialKey ?? "";

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <div className="flex-1 min-h-0 relative pb-2 border-b rounded-t border-slate-200 bg-white">
        <div className={`h-full w-full ${hasData ? "overflow-auto" : ""}`.trim()}>
          {isLoading ? (
            <div className="p-2 h-full">
              <Skeleton variant="full" />
            </div>
          ) : !hasData ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-slate-500 py-10">
              <SearchX className="text-4xl mb-2" />
              <p className="font-medium text-slate-600">Data tidak ditemukan</p>
              <p className="text-xs mt-1">Coba sesuaikan filter atau pencarian Anda.</p>
            </div>
          ) : (
            <table ref={tableContainerRef} className="w-full text-sm text-left">
              <thead className="uppercase sticky top-0 bg-slate-200 shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 w-10">No</th>
                  {safeHeaders.map((header) => (
                    <th
                      key={header.key}
                      className={`px-4 py-3 text-xs font-semibold text-slate-700 ${header.className ?? ""}`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {contentData.map((row, rowIndex) => {
                  const test = tableListColor(rowIndex);
                  return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: no comment
                    <tr key={rowIndex} className={`${test}`.trim()}>
                      <td className="px-4 py-3 text-center text-slate-500 font-medium">{rowIndex + 1}</td>

                      {safeHeaders.map((header) => {
                        const cellContent: ReactNode = header.render
                          ? header.render(row[header.key] ?? row[safeSpecialKey], row)
                          : String(row[header.key] ?? "-");
                        return (
                          <td key={header.key} className={`px-4 py-3 text-slate-700 ${header.className ?? ""}`}>
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {needPagination && (
        <div className="flex-none flex flex-row items-center w-full py-2 px-2 bg-white border-t border-slate-200 rounded-b">
          <div className="flex-1 flex items-center gap-1 flex-wrap">
            <Button
              needAnimation={false}
              onClick={() => onChange(current - 1)}
              disabled={current === 1 || isLoading || !hasData || total < 1}
              className="min-w-9 h-9 py-0 px-2.5 border border-slate-300 rounded-md bg-white text-slate-700 text-sm cursor-pointer transition-all hover:not-disabled:bg-slate-100 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-default"
            >
              {"<< Sebelumnya"}
            </Button>

            {hasData &&
              pages.map((item, index) =>
                item === "..." ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: no comment
                  <span key={index} className="py-0 px-1 text-slate-500 text-sm">
                    {item}
                  </span>
                ) : (
                  <Button
                    // biome-ignore lint/suspicious/noArrayIndexKey: no comment
                    key={index}
                    needAnimation={false}
                    onClick={() => typeof item === "number" && onChange(item)}
                    disabled={current === item || isLoading || !hasData}
                    className={`min-w-9 h-9 py-0 px-2.5 border rounded-md text-sm cursor-pointer transition-all hover:not-disabled:bg-slate-100 disabled:cursor-default ${
                      item === current
                        ? "border-blue-600 bg-blue-600 text-white font-medium"
                        : "border-slate-300 bg-white text-slate-700 disabled:bg-slate-300 disabled:text-slate-500"
                    }`}
                  >
                    {String(item)}
                  </Button>
                )
              )}

            <Button
              needAnimation={false}
              onClick={() => onChange(current + 1)}
              disabled={current === total || isLoading || !hasData || total < 1}
              className="min-w-9 h-9 py-0 px-2.5 border border-slate-300 rounded-md bg-white text-slate-700 text-sm cursor-pointer transition-all hover:not-disabled:bg-blue-600 hover:not-disabled:text-white disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-default"
            >
              {"Berikutnya >>"}
            </Button>
          </div>

          {/* 🌟 FIX 4: Changed flex-1/2 to flex-1 */}
          <div className="flex-1 text-right pr-2 text-sm text-slate-600">
            Halaman {!hasData || isLoading || total < 1 ? "?" : String(current)} dari {total < 1 ? "?" : String(total)}
          </div>
        </div>
      )}
    </div>
  );
}
