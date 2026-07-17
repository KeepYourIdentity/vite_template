import type { ChartComponentLike } from "chart.js";

/** Tipe chart yang didukung lewat preset registrasi. */
export type PresetType = "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea" | "bubble" | "scatter";

/** Komponen Chart.js yang perlu didaftarkan untuk satu preset tipe chart. */
export interface PresetConfig {
  controller: ChartComponentLike;
  elements: ChartComponentLike[];
  scales: ChartComponentLike[];
}

export type ThemeName = "light" | "dark";

export interface ThemeConfig {
  color: string;
  borderColor: string;
  gridColor: string;
  backgroundColor: string;
}

/** "auto" mengikuti preferensi sistem (prefers-color-scheme). */
export type ThemeOption = "auto" | ThemeName | ThemeConfig;

export type PaletteName = "vibrant" | "pastel" | "monochrome";
