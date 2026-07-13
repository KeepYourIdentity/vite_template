import { lazy, useEffect, useState } from "react";

import type { ComponentType, LazyExoticComponent } from "react";

/**
 * Utilitas untuk mengimpor komponen secara dinamis (Code Splitting) menggunakan named exports.
 * Menghilangkan kebutuhan untuk default export pada file komponen.
 * @param factory - Fungsi import dinamis, contoh: () => import("./features")
 * @param name - Nama komponen yang diekspor dari modul tersebut
 * @returns React Lazy Component
 * @KeepYourIdentity - Creator
 * @version 1.1
 */
export const LazyImport = <C, T extends Record<string, ComponentType<C>>>(
  factory: () => Promise<T>,
  name: keyof T
): LazyExoticComponent<T[keyof T]> => {
  return lazy(() =>
    factory().then((module) => ({
      default: module[name],
    }))
  );
};

/**
 * Hook yang memberikan nilai setelah jeda waktu tertentu,
 * memastikan fungsi (seperti fetch API) dipanggil hanya setelah user berhenti berinteraksi.
 * @param value - Nilai dengan tipe apa pun (T) yang ingin di-debounce
 * @param delay - Waktu tunda dalam milidetik (default: 500)
 * @returns Nilai yang sudah di-debounce
 * @KeepYourIdentity - Creator
 * @version 2.0
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
