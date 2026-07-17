import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
} from "chart.js";

import type { PaletteName, PresetConfig, PresetType, ThemeConfig, ThemeName } from "../types";

/**
 * Komponen apa saja yang perlu didaftarkan untuk masing-masing tipe chart.
 * Dipakai oleh `registerCharts` (lihat ./register.ts).
 */
export const CHART_PRESETS: Readonly<Record<PresetType, PresetConfig>> = {
  line: {
    controller: LineController,
    elements: [LineElement, PointElement],
    scales: [CategoryScale, LinearScale],
  },
  bar: {
    controller: BarController,
    elements: [BarElement],
    scales: [CategoryScale, LinearScale],
  },
  pie: { controller: PieController, elements: [ArcElement], scales: [] },
  doughnut: {
    controller: DoughnutController,
    elements: [ArcElement],
    scales: [],
  },
  radar: {
    controller: RadarController,
    elements: [LineElement, PointElement],
    scales: [RadialLinearScale],
  },
  polarArea: {
    controller: PolarAreaController,
    elements: [ArcElement],
    scales: [RadialLinearScale],
  },
  bubble: {
    controller: BubbleController,
    elements: [PointElement],
    scales: [LinearScale],
  },
  scatter: {
    controller: ScatterController,
    elements: [PointElement],
    scales: [LinearScale],
  },
};

/** Token warna tema. Dipakai sebagai sumber warna untuk options chart, bukan memutasi default global. */
export const CHART_THEMES: Readonly<Record<ThemeName, ThemeConfig>> = {
  light: {
    color: "#374151",
    borderColor: "rgba(15, 23, 42, 0.1)",
    gridColor: "rgba(15, 23, 42, 0.08)",
    backgroundColor: "#ffffff",
  },
  dark: {
    color: "#d1d5db",
    borderColor: "rgba(255, 255, 255, 0.12)",
    gridColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#111827",
  },
};

/** Palet warna RGB untuk chart multi-seri/multi-slice (pie, doughnut, polarArea, dll). */
export const CHART_PALETTES: Readonly<Record<PaletteName, ReadonlyArray<readonly [number, number, number]>>> = {
  vibrant: [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [75, 192, 192],
    [153, 102, 255],
    [255, 159, 64],
    [199, 199, 199],
    [83, 102, 255],
    [255, 99, 255],
    [99, 255, 132],
  ],
  pastel: [
    [255, 179, 186],
    [186, 225, 255],
    [255, 241, 186],
    [186, 255, 201],
    [229, 204, 255],
    [255, 223, 186],
  ],
  monochrome: [
    [30, 30, 30],
    [70, 70, 70],
    [110, 110, 110],
    [150, 150, 150],
    [190, 190, 190],
    [225, 225, 225],
  ],
};
