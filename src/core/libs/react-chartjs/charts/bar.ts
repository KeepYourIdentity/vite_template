import type { ChartDataset } from "chart.js";

export interface BarDatasetOptions {
  label?: string;
  color?: string;
  borderRadius?: number;
}

/** Dataset bar chart dengan sudut membulat & lebar batang yang dibatasi. */
export function createBarDataset(data: number[], options: BarDatasetOptions = {}): ChartDataset<"bar", number[]> {
  const { label = "Dataset", color = "rgb(37, 99, 235)", borderRadius = 6 } = options;

  return {
    label,
    data,
    backgroundColor: color,
    borderRadius,
    maxBarThickness: 32,
  };
}
