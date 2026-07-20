import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "ui/components/element/Button";

import type { ModalProps } from "./index.types";

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-lg" }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className={`relative bg-white rounded-xl shadow-2xl w-full ${maxWidth} flex flex-col gap-4 max-h-[90vh] overflow-hidden`}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="px-3 pt-2 flex flex-col gap-2">
              <div className="p-2 flex flex-row items-center justify-between">
                {subtitle?.trim() ? (
                  <div className="flex-auto flex flex-col gap-1">
                    <p className="text-sm font-medium text-slate-800">{title}</p>
                    <p className="text-xs text-slate-400">{subtitle}</p>
                  </div>
                ) : (
                  <h3 className="flex-auto text-lg font-bold text-slate-800">{title}</h3>
                )}

                <Button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <hr className="text-slate-200" />
            </div>

            {/* Body */}
            <div className="px-3 pb-2 overflow-y-auto flex-1 custom-scrollbar">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
