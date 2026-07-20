import { useEffect, useMemo, useState } from "react";

export interface UsePaginationParams<T> {
  data: T[];
  initialLimit?: number;
  initialPage?: number;
  initialOrderBy?: string;
  initialOrderDirection?: "asc" | "desc";
  initialFilter?: string;
  filterFn?: (item: T, filter: string) => boolean;
  sortFn?: (a: T, b: T, orderBy: string, orderDirection: "asc" | "desc") => number;
}

export const usePagination = <T>({
  data,
  initialLimit = 10,
  initialPage = 1,
  initialOrderBy,
  initialOrderDirection = "asc",
  initialFilter = "",
  filterFn,
  sortFn,
}: UsePaginationParams<T>) => {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">(initialOrderDirection);

  const [draftFilter, setDraftFilter] = useState(initialFilter);
  const [filter, setFilter] = useState(initialFilter);

  const { currentData, total } = useMemo(() => {
    let nextData = [...data];

    const normalized = filter.trim().toLowerCase();

    if (normalized) {
      nextData = nextData.filter((item) => {
        if (filterFn) {
          return filterFn(item, normalized);
        }

        const searchable = Object.values(item as Record<string, unknown>)
          .filter((v): v is string | number => typeof v === "string" || typeof v === "number")
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalized);
      });
    }

    if (orderBy && sortFn) {
      nextData.sort((a, b) => sortFn(a, b, orderBy, orderDirection));
    }

    const start = (page - 1) * limit;

    return {
      currentData: nextData.slice(start, start + limit),
      total: nextData.length,
    };
  }, [data, filter, limit, orderBy, orderDirection, filterFn, page, sortFn]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    const safePage = Math.min(page, totalPages);

    if (safePage !== page) {
      setPage(safePage);
    }
  }, [page, totalPages]);

  const applyFilter = () => {
    setPage(1);
    setFilter(draftFilter);
  };

  return {
    page,
    pageSize: limit,
    total,
    totalPages,

    currentData,

    orderBy,
    setOrderBy,

    orderDirection,
    setOrderDirection,

    draftFilter,
    setDraftFilter,

    filter,
    applyFilter,

    setPage,
  };
};
