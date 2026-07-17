import type { ChartDataset } from "chart.js";

export interface LineDatasetOptions {
  label?: string;
  color?: string;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
}

/** Dataset line chart dengan default yang masuk akal (warna solid, sedikit melengkung). */
export function createLineDataset(data: number[], options: LineDatasetOptions = {}): ChartDataset<"line", number[]> {
  const { label = "Dataset", color = "rgb(37, 99, 235)", fill = false, tension = 0.35, pointRadius = 4 } = options;

  return {
    label,
    data,
    borderColor: color,
    backgroundColor: color,
    borderWidth: 2.5,
    pointBackgroundColor: color,
    pointBorderWidth: 0,
    pointRadius,
    pointHoverRadius: pointRadius + 1,
    fill,
    tension,
  };
}

/**
 * Terapkan efek "comet tail" pada dataset line chart: titik & ruas garis
 * mulai `splitIndex` digambar dengan `fadedColor` (mis. untuk data
 * proyeksi yang belum aktual), titik sebelumnya tetap warna aslinya.
 */
export function withCometTail(
  dataset: ChartDataset<"line", number[]>,
  splitIndex: number,
  fadedColor: string
): ChartDataset<"line", number[]> {
  const values = dataset.data ?? [];
  const baseColor = dataset.borderColor as string;

  return {
    ...dataset,
    pointBackgroundColor: values.map((_, index) => (index >= splitIndex ? fadedColor : baseColor)),
    segment: {
      borderColor: (ctx) => (ctx.p1DataIndex >= splitIndex ? fadedColor : baseColor),
    },
  };
}
