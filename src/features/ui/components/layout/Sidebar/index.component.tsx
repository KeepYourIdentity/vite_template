import { Circle, CircleChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "ui/components/element";
import { useRecursiveMenuItem } from "./useIndex";

import type { ReactElement } from "react";
import type { INumShades, ISidebarMenu, RecursiveMenuItemProps } from "./index.types";
import type { useSidebar } from "./useIndex";

const BG_MAP: Record<INumShades, string> = {
  "500": "bg-blue-500",
  "600": "bg-blue-600",
  "700": "bg-blue-700",
  "800": "bg-blue-800",
  "900": "bg-blue-900",
};

export default function RecursiveMenuItem(props: RecursiveMenuItemProps<ReturnType<typeof useSidebar>>) {
  props = { ...props, level: props.level ?? 0 };
  const { baseValue, baseComponent, baseFunction } = useRecursiveMenuItem(props);
  const { isParent, name, paddingLeft, isActive, iconSize, newLevel, isOpen, children, newSidebarContext, safePath } =
    baseValue;
  const { Icon, Link, ChevronDown, ChevronRight } = baseComponent;
  const { handleNavigate, toggleSubmenu } = baseFunction;
  // const bgColor = `bg-blue-${Math.min(9, 6 + newLevel)}00`;
  const bgColor = BG_MAP[(String(Math.min(9, 5 + newLevel) * 100) as INumShades) || "600"];
  const fontSize = newLevel === 0 ? "text-sm" : "text-xs";

  return isParent ? (
    <div className={`${newLevel === 0 ? "" : "pl-2"} mb-1`}>
      <Button
        onClick={() => toggleSubmenu(name)}
        className={`w-full flex flex-row items-center justify-between py-2 rounded-md transition pr-3 cursor-pointer ${paddingLeft} ${
          isActive ? `${bgColor} text-white font-semibold` : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
        }`.trim()}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-3">
            {typeof Icon !== "boolean" && <Icon size={iconSize} />}
            <span className={`${fontSize} font-medium`}>{name}</span>
          </div>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 flex flex-col gap-1 overflow-hidden"
          >
            {/* REKURSI: Memanggil dirinya sendiri untuk merender anak-anaknya */}
            {(children as ISidebarMenu[]).map(
              (child): ReactElement => (
                <RecursiveMenuItem
                  key={child.id}
                  item={child}
                  level={newLevel + 1}
                  sidebarContext={newSidebarContext}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className="pl-2 mb-1">
      <Link
        to={safePath}
        onClick={() => handleNavigate(safePath)}
        className={`pl-2 flex flex-row items-center gap-3 py-2 rounded-md transition pr-3 ${paddingLeft} ${
          isActive ? `${bgColor} text-white font-medium` : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        }`.trim()}
      >
        {typeof Icon !== "boolean" && !isActive && <Icon size={iconSize} />}
        {typeof Icon === "boolean" && !isActive && <Circle size={iconSize} />}
        {typeof Icon === "boolean" && isActive && <CircleChevronRight size={iconSize} />}
        <span className={`${fontSize} font-medium ${paddingLeft}`.trim()}>{name}</span>
      </Link>
    </div>
  );
}
