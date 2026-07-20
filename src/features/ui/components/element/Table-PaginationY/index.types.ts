import type { ReactElement, RefObject } from "react";

export interface ITableHeader {
  key: string;
  label: string;
  className?: string;
  render?: (value: unknown, row: Record<string, unknown>) => ReactElement;
}

export interface ITableProps<T = unknown> {
  total: number;
  current: number;
  onChange: (value: number) => void;
  contentHeader: ITableHeader[];
  contentData: Record<string, T>[];
  tableContainerRef?: RefObject<HTMLTableElement>;
  isLoading?: boolean;
  specialKey?: string;
  tableListColor?: (arg?: unknown) => string;
  needPagination?: boolean;
}
