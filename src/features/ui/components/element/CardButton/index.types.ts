import type { ReactNode } from "react";

export interface ICardProps {
  animated?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  TopSide?: ReactNode;
  BottomSide?: ReactNode;
  title?: string; // tambahan
  "aria-disabled"?: boolean; // tambahan
}
