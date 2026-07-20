import type { ReactNode, Ref } from "react";
import type { GroupBase, Props as ReactSelectProps, SelectInstance } from "react-select";

export interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends ReactSelectProps<Option, IsMulti, Group> {
  ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
  label?: ReactNode;
  id?: string;
  parentClassName?: string;
  labelClassName?: string;
  selectClassName?: boolean | string;
}
