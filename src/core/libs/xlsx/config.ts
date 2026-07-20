import type { ExportOptions, MultiSheetPayload } from "./types";

export const DEFAULT_CONFIG: Required<ExportOptions> = {
  fileName: `Export_${new Date().toISOString().split("T")[0]}`,
  sheetName: "Data",
  dateFormat: "yyyy-mm-dd hh:mm:ss",
  autoClose: 3000,
  includeTimestamp: false,
  columnWidths: [],
};

export const sanitizeSheetName = (name: string, maxLength: number = 31): string => {
  if (!name) return "Sheet1";
  const sanitized = name.replace(/[\\/*?:[\]]/g, "_").trim();
  return sanitized.substring(0, maxLength) || "Sheet1";
};

export const formatFileName = (fileName: string): string => {
  if (!fileName) return "Export.xlsx";
  const cleanName = fileName.replace(/\.xlsx$/i, "").replace(/[<>:"/\\|?*]/g, "_");
  return `${cleanName}.xlsx`;
};

export const isMultiSheetData = <T>(data: T[] | MultiSheetPayload<T>[]): data is MultiSheetPayload<T>[] =>
  data.length > 0 &&
  typeof data[0] === "object" &&
  data[0] !== null &&
  "name" in data[0] &&
  "data" in data[0] &&
  Array.isArray((data[0] as MultiSheetPayload<T>).data);
