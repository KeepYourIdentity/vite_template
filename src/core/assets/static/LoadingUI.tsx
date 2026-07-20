import { AnimatePresence, motion } from "motion/react";

import type { ReactElement } from "react";

export default function LoadingUI(): ReactElement {
  return (
    <AnimatePresence>
      <motion.div
        // Animasi saat komponen pertama kali dimuat (muncul perlahan)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 min-h-0 flex flex-col items-center justify-center"
      >
        <div className="relative w-12 h-12 mb-4">
          <motion.div
            // Menggantikan animate-spin Tailwind dengan rotasi Framer Motion
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="absolute inset-0 w-full h-full border-4 border-transparent border-t-blue-500 border-b-red-500 rounded-full"
          />
        </div>
        <motion.p
          // Menambahkan efek teks berdenyut (pulse)
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-lg font-semibold tracking-wide"
        >
          Memuat Tampilan...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
