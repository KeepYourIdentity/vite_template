import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  it("does not enter an infinite render loop when data prop changes reference", () => {
    const initialData = [
      { id: 1, name: "Ada" },
      { id: 2, name: "Budi" },
    ];

    const { result, rerender } = renderHook(
      ({ data }: { data: Array<{ id: number; name: string }> }) =>
        usePagination({
          data,
          initialLimit: 1,
          initialOrderBy: "name",
          initialOrderDirection: "asc",
          sortFn: (a, b, orderBy, orderDirection) => {
            const left = String(a[orderBy as keyof typeof a]).toLowerCase();
            const right = String(b[orderBy as keyof typeof b]).toLowerCase();

            if (left < right) return orderDirection === "asc" ? -1 : 1;
            if (left > right) return orderDirection === "asc" ? 1 : -1;
            return 0;
          },
        }),
      { initialProps: { data: initialData } }
    );

    expect(result.current.total).toBe(2);
    expect(result.current.currentData).toHaveLength(1);
    expect(result.current.currentData[0]).toEqual({ id: 1, name: "Ada" });

    rerender({ data: [...initialData] });

    expect(result.current.total).toBe(2);
    expect(result.current.currentData).toHaveLength(1);
    expect(result.current.currentData[0]).toEqual({ id: 1, name: "Ada" });
  });
});
