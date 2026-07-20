export interface ColumnMomConfig {
  header: string;
  accessor: string;
  sticky?: "left" | "right";
  width?: string;
}

export interface UniversalTableMomProps {
  columns: ColumnMomConfig[];
  data: Record<string, unknown>[];
  title?: string;
  kode?: string;
}
