import { motion } from "motion/react";

import type { TargetAndTransition } from "motion/react";
import type { ReactElement } from "react";
import type { ButtonProps } from "./index.types";

const DEFAULT_WHILE_TAP: TargetAndTransition = { scale: 0.9 };

/**
 * Komponen tombol serbaguna dengan dukungan animasi framer-motion.
 *
 * @examples
 * // Tombol dengan animasi (default)
 * <Button colorClass="bg-blue-600 text-white" onClick={handleSave}>
 *   Simpan
 * </Button>
 *
 * @example
 * // Tombol submit tanpa animasi
 * <Button needAnimation={false} type="submit" colorClass="bg-green-600 text-white">
 *   Login
 * </Button>
 */
export default function Button({
  ref,
  type = "button",
  disabled = false,
  needAnimation = true,
  children = "Click Me",
  className = "",
  whileTap,
  ...props
}: ButtonProps): ReactElement {
  const baseClass = "p-2 rounded select-none";
  const resolvedClassName = `${baseClass} ${className}`.trim().replace(/\s+/g, " ");

  const mergedWhileTap = {
    ...DEFAULT_WHILE_TAP,
    ...(whileTap && typeof whileTap === "object" && !Array.isArray(whileTap) ? whileTap : {}),
  };

  return needAnimation ? (
    <motion.button
      ref={ref}
      type={type}
      className={resolvedClassName}
      disabled={disabled}
      whileTap={mergedWhileTap}
      {...props}
    >
      {children}
    </motion.button>
  ) : (
    <button ref={ref} type={type} className={resolvedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
