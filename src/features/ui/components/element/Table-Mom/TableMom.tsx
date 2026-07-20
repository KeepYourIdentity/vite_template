// import type React from "react";

import { TrendingDown, TrendingUp } from "lucide-react";

import type { UniversalTableMomProps } from "./TableMom.types";

// export const Table: React.FC<UniversalTableProps> = ({ variant, columns, data, title }) => {
export const TableMom = ({ columns, data, title }: UniversalTableMomProps) => {
  const renderCellContent = (value: unknown, accessor: string) => {
    const stringValue = typeof value === "string" ? value : String(value ?? "");

    if (accessor.startsWith("bln_")) {
      let bgClass = "bg-[#e2f0d9]";
      let textClass = "text-black";
      let iconIndex = <TrendingUp size={14} />;

      const numericValue = value ? parseFloat(stringValue.replace(",", ".").replace("%", "")) : 0;

      if (stringValue === "" || numericValue < 0) {
        bgClass = "bg-[#fce4d6]";
        textClass = "text-[#c00000]";
        iconIndex = <TrendingDown size={14} />;
      }

      return (
        <div
          className={`flex items-center justify-center gap-1.5 ${bgClass} ${textClass} p-2 -m-2 text-center font-medium flex flex-row gap-2`}
        >
          {iconIndex}
          <span>{stringValue}</span>
        </div>
      );
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
                const isStickyLeft = col.sticky === "left";
                const isStickyRight = col.sticky === "right";
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
                      const isStickyLeft = col.sticky === "left";
                      const isStickyRight = col.sticky === "right";
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
                          {renderCellContent(row[col.accessor], col.accessor)}
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
    </div>
  );
};

export default TableMom;
