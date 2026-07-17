import { withAlpha } from "../utils";

import type { ChartDataset } from "chart.js";

export interface BubblePoint {
  x: number;
  y: number;
  r: number;
}

export interface BubbleDatasetOptions {
  label?: string;
  color?: string;
}

/** Dataset bubble chart: titik berwarna semi-transparan dengan tepi solid. */
export function createBubbleDataset(
  data: BubblePoint[],
  options: BubbleDatasetOptions = {}
): ChartDataset<"bubble", BubblePoint[]> {
  const { label = "Dataset", color = "rgb(37, 99, 235)" } = options;

  return {
    label,
    data,
    backgroundColor: withAlpha(color, 0.6),
    borderColor: color,
  };
}
