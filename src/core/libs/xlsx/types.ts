export interface CustomHeader<T> {
  key: keyof T;
  label: string;
}

export interface ExportOptions {
  fileName?: string;
  sheetName?: string;
  dateFormat?: string;
  autoClose?: number;
  includeTimestamp?: boolean;
  columnWidths?: number[];
}

export interface MultiSheetPayload<T = Record<string, unknown>> {
  name: string;
  data: T[];
}
