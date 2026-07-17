import { generateChartColors } from "../palette";

import type { ChartDataset } from "chart.js";
import type { PaletteName } from "../types";

export interface PolarAreaDatasetOptions {
  palette?: PaletteName;
}

/** Dataset polar area chart: satu warna per slice, diambil dari palet. */
export function createPolarAreaDataset(
  data: number[],
  options: PolarAreaDatasetOptions = {}
): ChartDataset<"polarArea", number[]> {
  const { palette = "vibrant" } = options;

  return {
    data,
    backgroundColor: generateChartColors(data.length, {
      palette,
      opacity: 0.7,
    }),
  };
}
