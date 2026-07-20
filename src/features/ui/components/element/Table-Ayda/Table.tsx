// import type React from "react";

import TablePagination from "./TablePagination";

import type { UniversalTableProps } from "./Table.types";

// export const Table: React.FC<UniversalTableProps> = ({ variant, columns, data, title }) => {
// export const Table = ({ variant, columns, data, title }: UniversalTableProps) => {
export const Table = ({ variant, columns, data, title, pagination }: UniversalTableProps) => {
  // const renderCellContent = (value: unknown, accessor: string) => {
  const renderCellContent = (value: unknown, accessor: string, row?: Record<string, unknown>) => {
    const stringValue = typeof value === "string" ? value : String(value ?? "");
    const currentColumn = columns.find((col) => col.accessor === accessor);

    if (variant === "mom") {
      if (accessor.startsWith("bln_") || accessor === "avg") {
        let bgClass = "bg-[#e2f0d9]";
        let textClass = "text-black";

        const numericValue = value ? parseFloat(stringValue.replace(",", ".").replace("%", "")) : 0;

        if (stringValue === "#DIV/0!" || numericValue < 0) {
          bgClass = "bg-[#fce4d6]";
          textClass = "text-[#c00000]";
        }

        return <div className={`${bgClass} ${textClass} p-2 -m-2 text-center font-medium`}>{stringValue}</div>;
      }
    }

    if (variant === "default" && accessor === "status_data") {
      return (
        <span className={`font-bold ${stringValue === "Existing" ? "text-red-600" : "text-teal-600"}`}>
          {stringValue}
        </span>
      );
    }

    if (accessor === "status_data") {
      return (
        <span className={`font-bold ${stringValue === "Existing" ? "text-red-600" : "text-teal-600"}`}>
          {stringValue}
        </span>
      );
    }

    if (variant === "gabung" && accessor === "actions") {
      // const currentColumn = columns.find(col => col.accessor === accessor);

      type ColumnWithActions = {
        renderActions: (data: Record<string, unknown>) => React.ReactNode;
      };

      return (
        <div className="flex items-center justify-center w-full px-1">
          {currentColumn &&
            "renderActions" in currentColumn &&
            typeof (currentColumn as ColumnWithActions).renderActions === "function" &&
            row && (
              <div className="flex gap-1.5 justify-center items-center shrink-0">
                {(currentColumn as ColumnWithActions).renderActions(row)}
              </div>
            )}
        </div>
      );
    }

    // Kondisi untuk separator angka dengan isCurrency: true
    if (currentColumn && "isCurrency" in currentColumn && currentColumn.isCurrency) {
      const numeric = Number(value);
      if (!Number.isNaN(numeric) && value !== null && value !== "") {
        return `Rp ${new Intl.NumberFormat("id-ID").format(numeric)}`;
      }
    }

    return stringValue || "-";
  };

  return (
    <div className="w-full flex flex-col">
      {title && (
        <div className="w-full bg-[#d6e7f7] border-t border-x border-gray-300 p-2 font-bold text-center text-gray-800 text-xs md:text-sm tracking-wide rounded-t-sm">
          {title}
        </div>
      )}

      <div
        className={`w-full overflow-x-auto border border-gray-300 relative ${title ? "border-t-0 rounded-b-sm" : "rounded-sm"}`}
      >
        <table className="w-full border-separate border-spacing-0 font-sans text-xs md:text-sm table-auto min-w-max">
          <thead>
            <tr>
              {columns.map((col, index) => {
                const isStickyLeft = variant === "mom" && col.sticky === "left";
                // const isStickyRight = variant === "gabung" && col.sticky === "right";
                const isStickyRight = (variant === "mom" || variant === "gabung") && col.sticky === "right";
                const stickyClass = isStickyLeft
                  ? "sticky left-0 z-40 bg-[#e2effa] border-r border-gray-300"
                  : isStickyRight
                    ? "sticky right-0 z-40 bg-[#e2effa] border-l border-gray-300"
                    : "bg-[#e2effa]";
                const keys = `header-${index}`;

                return (
                  <th
                    key={keys}
                    className={`border border-gray-300 p-2 font-bold text-center text-gray-800 whitespace-nowrap ${stickyClass}`}
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    {col.header}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="border border-gray-300 p-5 text-center text-gray-500">
                  Tidak ada data untuk ditampilkan.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const keys = `row-${rowIndex}`;
                return (
                  <tr key={keys} className="hover:bg-gray-50">
                    {columns.map((col, colIndex) => {
                      const isStickyLeft = variant === "mom" && col.sticky === "left";
                      // const isStickyRight = variant === "mom" && col.sticky === "right";
                      const isStickyRight = (variant === "mom" || variant === "gabung") && col.sticky === "right";
                      const stickyClass = isStickyLeft
                        ? "sticky left-0 z-20 bg-white border-r border-gray-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                        : isStickyRight
                          ? "sticky right-0 z-20 bg-white border-l border-gray-300 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]"
                          : "bg-white";
                      const keysII = `cell-${rowIndex}-${colIndex}`;

                      return (
                        <td
                          key={keysII}
                          className={`border border-gray-300 p-2 whitespace-nowrap ${stickyClass}`}
                          style={{ width: col.width, minWidth: col.width }}
                        >
                          {/* {renderCellContent(row[col.accessor], col.accessor)} */}
                          {renderCellContent(row[col.accessor], col.accessor, row)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <TablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          filter={pagination.filter}
          loading={pagination.loading}
          onFilterChange={pagination.onFilterChange}
          onRefresh={pagination.onRefresh}
          onChange={pagination.onChange}
        />
      )}
    </div>
  );
};

export default Table;
