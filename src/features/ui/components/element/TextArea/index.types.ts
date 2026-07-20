import type { ChangeEventHandler, ReactNode, Ref, TextareaHTMLAttributes } from "react";

type OmittedProps = "value" | "defaultValue" | "onChange";

type BaseProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, OmittedProps> & {
  ref?: Ref<HTMLTextAreaElement>;
  label?: ReactNode;
  id?: string;
  parentClassName?: string;
  labelClassName?: string;
  customPadding?: boolean | string;
};

type ControlledProps = BaseProps & {
  uncontrolled?: false;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

type UncontrolledProps = BaseProps & {
  uncontrolled: true;
  defaultValue?: string;
  onChange?: never; // ← compile error jika consumer iseng kirim onChange
};

export type TextAreaProps = ControlledProps | UncontrolledProps;
