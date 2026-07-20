import { _Err, _Pass } from "core/libs/react-toastify";
import { utils, writeFile } from "xlsx";
import { DEFAULT_CONFIG, formatFileName, isMultiSheetData, sanitizeSheetName } from "./config";

import type { CustomHeader, ExportOptions, MultiSheetPayload } from "./types";

/**
 * Mengekspor data ke file Excel dengan memori efisien.
 * Mendukung single-sheet maupun multi-sheet.
 */
export function exportToExcel<T extends Record<string, unknown>>(
  inputData: T[] | MultiSheetPayload<T>[],
  options: ExportOptions = {}
): boolean {
  const config = { ...DEFAULT_CONFIG, ...options };

  if (!inputData || (Array.isArray(inputData) && inputData.length === 0)) {
    _Err("Tidak ada data untuk diekspor!", { autoClose: config.autoClose });
    return false;
  }

  try {
    const workbook = utils.book_new();

    if (isMultiSheetData(inputData)) {
      const sheetNames = new Set<string>();

      // loop baru
      for (const [index, { name, data }] of inputData.entries()) {
        if (!Array.isArray(data) || data.length === 0) continue;

        let safeName = sanitizeSheetName(name);
        if (sheetNames.has(safeName)) safeName = `${safeName}_${index + 1}`;
        sheetNames.add(safeName);

        const ws = utils.json_to_sheet(data, {
          cellDates: true,
          dateNF: config.dateFormat,
        });

        if (config.columnWidths && config.columnWidths.length > 0) {
          ws["!cols"] = config.columnWidths.map((width) => ({ wch: width }));
        }

        utils.book_append_sheet(workbook, ws, safeName);
      }

      // loop lama
      //   inputData.forEach(({ name, data }, index) => {
      //     if (!Array.isArray(data) || data.length === 0) return;

      //     let safeName = sanitizeSheetName(name);
      //     if (sheetNames.has(safeName)) safeName = `${safeName}_${index + 1}`;
      //     sheetNames.add(safeName);

      //     const ws = utils.json_to_sheet(data, {
      //       cellDates: true,
      //       dateNF: config.dateFormat,
      //     });

      //     if (config.columnWidths && config.columnWidths.length > 0) {
      //       ws["!cols"] = config.columnWidths.map((width) => ({ wch: width }));
      //     }

      //     utils.book_append_sheet(workbook, ws, safeName);
      //   });

      if (workbook.SheetNames.length === 0) {
        _Err("Tidak ada sheet dengan data valid!", {
          autoClose: config.autoClose,
        });

        return false;
      }
    } else {
      const safeSheetName = sanitizeSheetName(config.sheetName);
      const ws = utils.json_to_sheet(inputData, {
        cellDates: true,
        dateNF: config.dateFormat,
      });

      if (config.columnWidths && config.columnWidths.length > 0) {
        ws["!cols"] = config.columnWidths.map((width) => ({ wch: width }));
      }

      utils.book_append_sheet(workbook, ws, safeSheetName);
    }

    let finalFileName = config.fileName || "Export";
    if (config.includeTimestamp) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      finalFileName = `${finalFileName}_${timestamp}`;
    }
    finalFileName = formatFileName(finalFileName);

    writeFile(workbook, finalFileName, { bookType: "xlsx", cellDates: true });

    _Pass(`File Excel "${finalFileName}" berhasil dibuat!`, {
      autoClose: config.autoClose,
    });
    return true;
  } catch (error) {
    console.error("Gagal ekspor Excel:", error);
    _Err(`Gagal membuat file Excel: ${error instanceof Error ? error.message : "Unknown error"}`, {
      autoClose: config.autoClose,
    });
    return false;
  }
}

/**
 * Utility: Export data dengan template/header custom secara efisien.
 */
export function exportWithCustomHeaders<T extends Record<string, unknown>>(
  data: T[],
  headers: CustomHeader<T>[],
  options: ExportOptions = {}
): boolean {
  if (!Array.isArray(data) || !Array.isArray(headers)) {
    _Err("Data atau headers tidak valid!");
    return false;
  }

  const transformedData = data.map((row) => {
    const newRow: Record<string, unknown> = {};
    for (const { key, label } of headers) {
      newRow[label] = row[key] ?? "";
    }
    return newRow;
  });

  return exportToExcel(transformedData, options);
}
