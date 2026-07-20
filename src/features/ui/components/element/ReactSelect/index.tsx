import ReactSelect from "react-select";

import type { GroupBase } from "react-select";
import type { SelectProps } from "./index.types";

export default function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  ref,
  label,
  id,
  parentClassName = "",
  labelClassName = "",
  selectClassName,
  className = "",
  classNames,
  ...props
}: SelectProps<Option, IsMulti, Group>) {
  const dynamicPadding =
    typeof selectClassName === "string" ? selectClassName : selectClassName === true ? "py-2" : "py-3.5";

  return (
    <div className={`space-y-2 ${parentClassName}`.trim()}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}

      <ReactSelect
        ref={ref}
        {...(id !== undefined ? { inputId: id } : {})}
        unstyled
        className={className}
        classNames={{
          control: ({ isFocused }) =>
            `flex items-center w-full border-2 rounded-xl bg-transparent transition-all outline-none ${
              isFocused ? "border-blue-500 ring-0" : "border-slate-200 hover:border-slate-300"
            }`,
          valueContainer: () => `px-4 ${dynamicPadding} gap-1`,
          input: () => "text-slate-700 m-0 p-0",
          placeholder: () => "text-slate-600",
          singleValue: () => "text-slate-700",
          indicatorSeparator: () => "bg-slate-200 mx-3 w-px h-6 my-auto",
          dropdownIndicator: ({ isFocused }) =>
            `p-2 mr-2 transition-colors ${isFocused ? "text-blue-500" : "text-slate-400 hover:text-slate-600"}`,
          clearIndicator: () => "p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer",
          menu: () => "mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden",
          menuList: () => "max-h-60 overflow-y-auto p-1 custom-scrollbar",
          option: ({ isFocused, isSelected }) =>
            `px-4 py-2.5 cursor-pointer rounded-lg transition-colors text-sm ${
              isSelected
                ? "bg-blue-600 text-white font-medium"
                : isFocused
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50"
            }`,
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}
