export interface ChartLineProps {
  legend?: boolean;
  titleText?: string;
  titleColor?: string;
  titleWeight: number | "normal" | "bold" | "bolder" | "lighter";
  titleSize?: number;
  yMax: number | string;
  xData: string[];
  yStepSize?: number;
  yFontSize?: number;
  yUnit?: string;
  datasets: LineDatasetConfig[];
}

interface LineDatasetConfig {
  id: string;
  label: string;
  yData: (number | null)[];
  lineColor?: string;
  /** Index mulai data proyeksi (opsional per-garis) */
  projectionStartIndex?: number | undefined;
  projectionColor?: string;
  defaultColor?: string;
  /** Titik mulai warna berbeda (default: sama dgn projectionStartIndex) */
  pointColorThresholdIndex?: number;
}
