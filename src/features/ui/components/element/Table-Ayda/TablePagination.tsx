import type { PaginationConfig } from "./Table.types";

const TablePagination = ({ page, pageSize, total, onChange }: PaginationConfig) => {
  const totalPages = Math.ceil(total / pageSize);

  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);
  let start = page - half;
  let end = page + half;
  // awal
  if (start < 1) {
    start = 1;
    end = Math.min(visiblePages, totalPages);
  }
  // akhir
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - visiblePages + 1);
  }

  return (
    // <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
    <div className="flex flex-col gap-3 px-4 py-3 border-t border-gray-200 bg-white sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        Halaman {page} dari {totalPages}
      </p>

      {/* <div className="flex gap-2"> */}
      <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          // className="px-3 py-1 border rounded disabled:opacity-50"
          className="px-2 sm:px-3 py-2 text-sm border rounded whitespace-nowrap disabled:opacity-50"
        >
          {"< Prev"}
        </button>

        {/* <div className="flex gap-2"> */}
        <div className="flex flex-wrap items-center gap-2">
          {start > 1 && (
            <>
              <button
                type="button"
                onClick={() => onChange(1)}
                className={`w-9 h-9 rounded border ${page === 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
              >
                1
              </button>

              {start > 2 && <span className="w-9 h-9 flex items-center justify-center">...</span>}
            </>
          )}

          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              onClick={() => onChange(pageNumber)}
              // className={`w-9 h-9 rounded border ${page === pageNumber ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100"}`}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded border text-sm flex items-center justify-center 
                ${
                  page === pageNumber
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {pageNumber}
            </button>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span className="w-9 h-9 flex items-center justify-center">...</span>}

              <button
                type="button"
                onClick={() => onChange(totalPages)}
                className={`w-9 h-9 rounded border ${page === totalPages ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          // className="px-3 py-1 border rounded disabled:opacity-50"
          className="px-2 sm:px-3 py-2 text-sm border rounded whitespace-nowrap disabled:opacity-50"
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
