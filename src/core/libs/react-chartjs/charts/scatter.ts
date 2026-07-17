import type { ChartDataset } from "chart.js";

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterDatasetOptions {
  label?: string;
  color?: string;
}

/** Dataset scatter chart: titik tanpa garis penghubung. */
export function createScatterDataset(
  data: ScatterPoint[],
  options: ScatterDatasetOptions = {}
): ChartDataset<"scatter", ScatterPoint[]> {
  const { label = "Dataset", color = "rgb(37, 99, 235)" } = options;

  return {
    label,
    data,
    backgroundColor: color,
    pointRadius: 4,
  };
}
