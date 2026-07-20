export interface ColumnConfig {
  header: string;
  accessor: string;
  sticky?: "left" | "right";
  width?: string;
  renderActions?: (rowData: Record<string, unknown>) => React.ReactNode;
  isCurrency?: boolean;
}

export interface UniversalTableProps {
  // variant: "mom" | "default";
  variant: "mom" | "default" | "gabung";
  columns: ColumnConfig[];
  data: Record<string, unknown>[];
  title?: string;
  kode?: string;
  pagination?: PaginationConfig;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  filter?: string | undefined;
  loading?: boolean | undefined;
  onFilterChange?: ((value: string) => void) | undefined;
  onRefresh?: (() => void) | undefined;
  onChange(page: number): void;
}
