import { useEffect, useMemo, useState } from "react";
import { CHART_THEMES } from "../constants";

import type { ThemeConfig, ThemeOption } from "../types";

function resolveTheme(option: ThemeOption, prefersDark: boolean): ThemeConfig {
  if (typeof option === "object") return option;
  if (option === "auto") return prefersDark ? CHART_THEMES.dark : CHART_THEMES.light;
  return CHART_THEMES[option];
}

function usePrefersDarkScheme(): boolean {
  const [prefersDark, setPrefersDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => setPrefersDark(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return prefersDark;
}

/**
 * Hook tema chart. Berbeda dari versi lama: hook ini TIDAK memutasi
 * `Chart.defaults` secara global (yang akan memengaruhi semua chart
 * di halaman sekaligus). `themeConfig` yang dikembalikan cukup dibaca
 * langsung untuk menyusun `options` chart kamu sendiri -- aman dipakai
 * di banyak chart berbeda secara independen.
 */
export function useChartTheme(theme: ThemeOption = "auto"): {
  themeConfig: ThemeConfig;
} {
  const prefersDark = usePrefersDarkScheme();
  const themeConfig = useMemo(() => resolveTheme(theme, prefersDark), [theme, prefersDark]);

  return { themeConfig };
}
