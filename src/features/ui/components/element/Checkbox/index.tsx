import { Check } from "lucide-react";

import type { CheckBoxProps } from "./index.types";

export function CheckBox({
  ref,
  label,
  id,
  name,
  checked = false,
  onChange,
  parentClassName = "",
  labelClassName = "",
  className = "",
  ...props
}: CheckBoxProps) {
  return (
    <div className={`flex items-center gap-2 ${parentClassName}`.trim()}>
      <div className="relative flex items-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`
            peer w-5 h-5 cursor-pointer appearance-none rounded
            border-2 border-slate-200 bg-transparent
            transition-all outline-none
            hover:border-slate-300
            checked:bg-blue-600 checked:border-blue-600
            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${className}
          `
            .trim()
            .replace(/\s+/g, " ")}
          {...props}
        />
        <Check
          className="pointer-events-none absolute left-0.5 top-0.5 hidden h-4 w-4 text-white peer-checked:block"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        />
      </div>

      {label && (
        <label htmlFor={id} className={`text-sm text-slate-700 cursor-pointer select-none ${labelClassName}`.trim()}>
          {label}
        </label>
      )}
    </div>
  );
}
