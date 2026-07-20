import { useMemo } from "react";

import type { ITableHeader } from "./index.types";

/**
 * Membangun array halaman untuk komponen pagination.
 * Menggunakan ellipsis ("...") untuk mempersingkat tampilan ketika total halaman > 7.
 *
 * Pola yang dihasilkan:
 * - Total ≤ 7 : semua nomor ditampilkan (1 2 3 4 5 6 7)
 * - Dekat awal: 1 2 3 4 ... N
 * - Dekat akhir: 1 ... N-3 N-2 N-1 N
 * - Tengah     : 1 ... C-1 C C+1 ... N
 *
 * @param total
 * @param current
 */
const buildPages = (total: number, current: number): Array<string | number> => {
  if (total < 8) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | string> = [1];
  const nearStart = current < 4;
  const nearEnd = current > total - 3;

  if (nearStart) {
    for (let i = 2; i <= 4; i++) pages.push(i);
    pages.push("...");
  } else if (nearEnd) {
    pages.push("...");
    for (let i = total - 3; i <= total - 1; i++) pages.push(i);
  } else {
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("...");
  }

  pages.push(total);
  return pages;
};

export const usePaginationTableY = <T = unknown>(
  total: number,
  current: number,
  contentHeader: ITableHeader[] = [],
  contentData: T[] = []
) => {
  const pages = useMemo(() => buildPages(total, current), [total, current]);
  const safeHeaders = useMemo(() => contentHeader.filter((h) => h?.key && h?.label), [contentHeader]);
  const hasData = useMemo(() => {
    if (contentData.length < 1) return false;
    const item = contentData[0];
    return Object.values(item as Record<string, unknown>).every((curr) => {
      const typeofCurr = typeof curr;
      if (!["string", "number", "boolean"].includes(typeofCurr)) return false;
      if (["number", "boolean"].includes(typeofCurr)) return true;
      return (curr as string).trim().length > 0;
    });
  }, [contentData]);

  return { hasData, pages, safeHeaders };
};
