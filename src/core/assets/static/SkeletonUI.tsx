// import { z } from "zod";

import type { ReactElement } from "react";

export const variants = {
  full: "size-full",
  fillWidth: "w-full",
  fillHeight: "h-full",
} as const;

// export const variantsSchema = z.enum(Object.keys(variants) as [keyof typeof variants, ...(keyof typeof variants)[]]);
// type IVariants = z.infer<typeof variantsSchema>;
type VariantsState = keyof typeof variants;

export interface SkeletonState {
  variant?: VariantsState;
  className?: string;
  customBackground?: string;
}

export default function Skeleton({ variant, className = "", customBackground = "" }: SkeletonState): ReactElement {
  const safeMerge = `relative overflow-hidden bg-zinc-300 ${variant !== void 0 && variants[variant]} ${className.trim()}`.trim();
  const safeBackground = `absolute inset-0 animate-shimmer ${customBackground || "bg-linear-to-r from-transparent via-white/30 to-transparent"}`.trim();
  return (
    <div className={safeMerge}>
      <div className={safeBackground} />
    </div>
  );
}
