import Button from "ui/components/element/Button";

import type { InputProps } from "./index.types";

function resolveInputPadding(inputClassName?: boolean | string): string {
  if (typeof inputClassName === "string") return inputClassName;
  return inputClassName === true ? "py-2" : "py-3.5";
}

export default function Input({
  ref,
  label,
  id,
  type = "text",
  IconLeft,
  IconRight,
  onIconRightClick,
  iconRightAriaLabel,
  inputClassName,
  parentClassName = "",
  labelClassName = "",
  disabled = false,
  ...props
}: InputProps) {
  const resolvedPadding = resolveInputPadding(inputClassName);

  return (
    <div className={`space-y-2 ${parentClassName}`.trim()}>
      {label !== undefined && (
        <label htmlFor={id} className={labelClassName.trim()}>
          {label}
        </label>
      )}

      <div className="relative">
        {IconLeft && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IconLeft className="h-5 w-5 text-slate-700" />
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          className={`
            block w-full pl-12 border-2 border-slate-200 rounded-xl
            bg-transparent text-slate-700 placeholder-slate-600
            focus:ring-0 focus:border-blue-500 transition-all outline-none
            ${IconRight ? "pr-10" : "pr-4"} ${resolvedPadding}
          `
            .trim()
            .replace(/\s+/g, " ")}
          {...props}
        />

        {IconRight && (
          <Button
            needAnimation={false}
            aria-label={iconRightAriaLabel}
            disabled={disabled}
            onClick={onIconRightClick}
            className="absolute inset-y-0 right-0 py-0! pl-0! pr-4! flex items-center bg-transparent rounded-r-xl! hover:scale-105 transition-transform"
          >
            {IconRight}
          </Button>
        )}
      </div>
    </div>
  );
}
