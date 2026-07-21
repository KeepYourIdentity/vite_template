import { AnimatePresence, motion } from "motion/react";
import { Button } from "ui/components/element";
import RecursiveMenuItem from "./index.component";
import { useSidebar } from "./useIndex";

import type { ReactElement } from "react";

export default function Sidebar(): ReactElement {
  const sidebarContext = useSidebar();
  const { sidebarMenus, isSidebarOpen, sidebarWidth, handleReturn, ChevronLeft } = sidebarContext;

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? sidebarWidth : 0,
          opacity: isSidebarOpen ? 1 : 0,
          x: isSidebarOpen ? 0 : -sidebarWidth,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-x-hidden shrink-0"
      >
        <div
          className="h-full flex flex-col gap-1 bg-gray-200 border border-gray-200 rounded shadow-md"
          style={{ width: sidebarWidth, minWidth: sidebarWidth }}
        >
          <nav className="flex-auto p-2 overflow-y-auto custom-scrollbar scrollbar-gutter-auto scrollbar-thin">
            {Array.isArray(sidebarMenus) &&
              sidebarMenus.map(
                (item, index): ReactElement => {
                  const keys = `${index}`
                  return (
                    <RecursiveMenuItem key={keys} item={item} level={0} sidebarContext={sidebarContext} />
                  )
                }
              )}
          </nav>
          <div className="p-2">
            <Button
              className="w-full flex flex-row items-center gap-2 px-3 py-2 rounded-md transition bg-primary cursor-pointer"
              onClick={() => handleReturn()}
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Kembali ke beranda</span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
