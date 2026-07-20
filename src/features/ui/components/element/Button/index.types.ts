import type { HTMLMotionProps } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

type OmittedMotionProps = "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, OmittedMotionProps> {
  ref?: Ref<HTMLButtonElement>;
  colorClass?: string;
  needAnimation?: boolean;
  children?: ReactNode;
  whileTap?: HTMLMotionProps<"button">["whileTap"];
}
