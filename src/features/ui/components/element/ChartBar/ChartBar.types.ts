export interface SeriesItem {
  dataKey: string;
  label: string;
}

export interface MyBarChartProps {
  title?: string;
  dataset: unknown[];
  xField: string;
  series: SeriesItem[];
  // width?: number;
  // height?: number;
  //bar
  barWidth?: number; // lebar bar
  // barSpacing?: number     // jarak antar bar dalam satu label
  // groupSpacing?: number  // jarak antar label
  //keterangan warna bar
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  //sumbu y
  yMin?: number;
  yMax?: number;
  yStepSize?: number;
  showYGrid?: boolean;
  //sumbu x
  showXGrid?: boolean;
  //background bar
  backgroundColor?: string[];
  // Tooltip Formatter
  valueFormatter?: (value: number) => string;
}
