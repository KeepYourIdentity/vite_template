import type { RawSidebarMenuState } from "mocks/types";

export function getFirstChildrenPath(data: RawSidebarMenuState[]): string {
  if (data.length < 1) return "";

  const firstChild = data[0] as RawSidebarMenuState;
  const isIntendedAsParent = Array.isArray(firstChild.children) && firstChild.children.length > 0;

  if (isIntendedAsParent) {
    return getFirstChildrenPath(firstChild.children as RawSidebarMenuState[]);
  }

  return firstChild.path ?? "";
}
