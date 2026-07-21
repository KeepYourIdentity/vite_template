import type { TextAreaProps } from "./index.types";

export default function TextArea({
  ref,
  label,
  id,
  parentClassName = "",
  labelClassName = "",
  customPadding,
  uncontrolled = false,
  className = "",
  ...props
}: TextAreaProps) {
  const dynamicPadding = typeof customPadding === "string" ? customPadding : customPadding === true ? "py-2" : "py-3.5";

  return (
    <div className={`space-y-2 ${parentClassName}`.trim()}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`
          block w-full px-4 ${dynamicPadding}
          border-2 rounded-xl bg-transparent
          transition-all outline-none resize-none
          border-slate-200 hover:border-slate-300
          focus:border-blue-500
          placeholder:text-slate-600 text-slate-700
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
        {...props}
      />
    </div>
  );
}
