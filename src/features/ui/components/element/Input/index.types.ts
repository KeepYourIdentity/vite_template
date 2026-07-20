import type { LucideIcon } from "lucide-react";
import type { HTMLInputTypeAttribute, InputHTMLAttributes, MouseEventHandler, ReactNode, Ref } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  ref?: Ref<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  label?: ReactNode;
  IconLeft?: LucideIcon;
  IconRight?: ReactNode;
  onIconRightClick?: MouseEventHandler<HTMLButtonElement>;
  iconRightAriaLabel?: string;
  inputClassName?: boolean | string;
  parentClassName?: string;
  labelClassName?: string;
}
