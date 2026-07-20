export interface PieItem {
  label: string;
  value: number;
  backgroundColor?: string;
  borderColor?: string;
}

export interface ChartPieProps {
  title?: string;
  datasetLabel?: string;
  dataItems: PieItem[];
  width?: number;
  height?: number;
  legendPosition?: "top" | "bottom" | "left" | "right";
}
