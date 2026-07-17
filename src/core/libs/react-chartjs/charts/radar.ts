import { withAlpha } from "../utils";

import type { ChartDataset } from "chart.js";

export interface RadarDatasetOptions {
  label?: string;
  color?: string;
}

/** Dataset radar chart: garis solid + fill transparan dari warna yang sama. */
export function createRadarDataset(data: number[], options: RadarDatasetOptions = {}): ChartDataset<"radar", number[]> {
  const { label = "Dataset", color = "rgb(37, 99, 235)" } = options;

  return {
    label,
    data,
    borderColor: color,
    backgroundColor: withAlpha(color, 0.2),
    pointBackgroundColor: color,
    pointBorderWidth: 0,
  };
}
