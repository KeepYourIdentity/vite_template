import { generateChartColors } from "../palette";

import type { ChartDataset } from "chart.js";
import type { PaletteName } from "../types";

export interface PieDatasetOptions {
  palette?: PaletteName;
}

/** Dataset pie chart: satu warna per slice, diambil dari palet. */
export function createPieDataset(data: number[], options: PieDatasetOptions = {}): ChartDataset<"pie", number[]> {
  const { palette = "vibrant" } = options;

  return {
    data,
    backgroundColor: generateChartColors(data.length, { palette }),
    borderWidth: 0,
  };
}
