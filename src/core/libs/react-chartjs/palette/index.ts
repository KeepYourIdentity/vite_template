import { CHART_PALETTES } from "../constants";

import type { PaletteName } from "../types";

export interface GenerateColorsOptions {
  opacity?: number;
  palette?: PaletteName;
}

/** Hasilkan N warna `rgba(...)` dengan mengulang (cycle) palet yang dipilih. */
export function generateChartColors(count: number, options: GenerateColorsOptions = {}): string[] {
  const { opacity = 1, palette = "vibrant" } = options;
  const colors = CHART_PALETTES[palette] ?? CHART_PALETTES.vibrant;

  return Array.from({ length: count }, (_, index) => {
    const [r, g, b] = colors[index % colors.length];
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  });
}
