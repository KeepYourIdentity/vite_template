import { generateChartColors } from "../palette";

import type { ChartDataset } from "chart.js";
import type { PaletteName } from "../types";

export interface DoughnutDatasetOptions {
  palette?: PaletteName;
}

/**
 * Dataset doughnut chart: mirip pie, satu warna per slice.
 * Catatan: lubang tengah (`cutout`) adalah opsi di level chart
 * (`options.cutout`), bukan di level dataset -- atur langsung di
 * options chart kamu, mis: `{ cutout: "65%" }`.
 */
export function createDoughnutDataset(
  data: number[],
  options: DoughnutDatasetOptions = {}
): ChartDataset<"doughnut", number[]> {
  const { palette = "vibrant" } = options;

  return {
    data,
    backgroundColor: generateChartColors(data.length, { palette }),
    borderWidth: 0,
  };
}
