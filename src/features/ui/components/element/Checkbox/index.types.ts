import type { ChangeEventHandler, InputHTMLAttributes, ReactNode, Ref } from "react";

type OmittedInputProps = "type" | "checked" | "onChange" | "id" | "name";

export interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> {
  ref?: Ref<HTMLInputElement>;
  label?: ReactNode;
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  parentClassName?: string;
  labelClassName?: string;
}
