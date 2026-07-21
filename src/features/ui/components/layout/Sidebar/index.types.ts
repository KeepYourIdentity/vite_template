import { z } from "zod";

import type { LucideIcon } from "lucide-react";
import type { RawSidebarMenuState } from "mocks/types";

const NumShades = ["500", "600", "700", "800", "900"] as const;
export const NumShadesSchema = z.enum(NumShades);
export type INumShades = z.infer<typeof NumShadesSchema>;

export interface ISidebarMenu extends Omit<RawSidebarMenuState, "icon" | "children"> {
  icon: LucideIcon | false;
  children?: ISidebarMenu[];
}

export interface RecursiveMenuItemProps<T> {
  item: ISidebarMenu;
  level?: number;
  sidebarContext: T;
}
