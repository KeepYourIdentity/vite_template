import type { IRawSidebarMenu } from "src/configs/base";

export function getFirstChildrenPath(data: IRawSidebarMenu[]): string {
  if (data.length < 1) return "";

  const firstChild = data[0] as IRawSidebarMenu;
  const isIntendedAsParent = Array.isArray(firstChild.children) && firstChild.children.length > 0;

  if (isIntendedAsParent) {
    return getFirstChildrenPath(firstChild.children as IRawSidebarMenu[]);
  }

  return firstChild.path ?? "";
}
