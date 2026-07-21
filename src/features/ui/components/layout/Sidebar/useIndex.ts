import { useSidebarControll } from "core/store";
import { local, session } from "core/utils";
import * as lucide from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFirstChildrenPath } from "utils/get-first-path";
import sidebarConfig from "./index.config";

import type { RawSidebarMenuState } from "mocks/types";
import type { ISidebarMenu, RecursiveMenuItemProps } from "./index.types";

export const useSidebar = () => {
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const sidebarMenu = local.get<RawSidebarMenuState[]>("localMenu");
  const location = useLocation();
  const navigate = useNavigate();

  const isSidebarShow = useSidebarControll((state) => state.isSidebarShow);
  const isSidebarOpen = useSidebarControll((state) => state.isSidebarOpen);
  const toggleSidebarOpen = useSidebarControll((state) => state.toggleSidebarOpen);
  const toggleSidebarShow = useSidebarControll((state) => state.toggleSidebarShow);

  const { sidebarWidth } = sidebarConfig;
  const { ChevronDown, ChevronRight, ChevronLeft } = lucide;

  const handleInit = useCallback(
    (data: RawSidebarMenuState[] | null): [number, string] => {
      if (!isSidebarShow) return [0, ""];

      if (data === null || data.length < 1) {
        local.remove("localMenu");
        return [1, "Sesi menu tidak valid atau kosong!"];
      }

      const firstPath = getFirstChildrenPath(data);
      if (firstPath.length < 1 || !firstPath.includes("/")) {
        local.remove("localMenu");
        return [1, "Sesi menu tidak valid atau kosong!"];
      }
      return [0, ""];
    },
    [isSidebarShow]
  );

  const handleReturn = useCallback(() => {
    toggleSidebarOpen(false);
    toggleSidebarShow(false);
    local.remove("localMenu");
    void navigate("/beranda");
  }, [toggleSidebarOpen, toggleSidebarShow, navigate]);

  const getIcon = useCallback(
    (icon: string): lucide.LucideIcon | false =>
      !(icon in lucide)
        ? false
        : // biome-ignore lint/performance/noDynamicNamespaceImportAccess: unsure icon set from backend
          (lucide[icon as keyof typeof lucide] as lucide.LucideIcon),
    []
  );

  const sidebarMenus = useMemo<ISidebarMenu[]>(() => {
    try {
      if (!isSidebarShow || loading) {
        return [];
      }

      const role = local.get<string>("localRole");

      // if (!Array.isArray(sidebarMenu) || sidebarMenu.length === 0) {
      //   if (!haveSidebar) return [];
      //   throw new Error("Sesi menu tidak valid atau kosong!");
      // }

      if (!role || role.trim().length < 1) {
        throw new Error("Role pengguna tidak valid! atau kosong");
      }

      function isRoleAllowed(itemRole: string | string[] | null): boolean {
        if (itemRole === null) return true;
        if (Array.isArray(itemRole)) return itemRole.includes(role as string);
        return itemRole
          .split(",")
          .map((r) => r.trim())
          .includes(role as string);
      }

      function processMenus(menus: RawSidebarMenuState[]): ISidebarMenu[] {
        const result: ISidebarMenu[] = [];

        for (const item of menus) {
          if (!isRoleAllowed(item.role)) continue;

          const isIntendedAsParent = Array.isArray(item.children) && item.children.length > 0;

          if (isIntendedAsParent) {
            const processedChildren = processMenus(item.children as RawSidebarMenuState[]);
            if (processedChildren.length > 0) {
              result.push({
                id: item.id,
                name: item.name,
                role: item.role,
                icon: getIcon(item.icon),
                children: processedChildren,
              });
            }
          } else {
            const hasValidPath = typeof item.path === "string" && item.path.trim() !== "";
            if (hasValidPath) {
              result.push({
                id: item.id,
                name: item.name,
                role: item.role,
                icon: getIcon(item.icon),
                path: item.path as string,
              });
            }
          }
        }

        return result.sort((a, b) => a.id - b.id);
      }

      return processMenus(sidebarMenu as RawSidebarMenuState[]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Gagal memuat menu: ${error.message}`);
      } else {
        console.error(`Gagal memuat menu (Unknown Error)`, error);
      }
      return [];
    }
  }, [getIcon, isSidebarShow, loading, sidebarMenu]);

  const isMenuActive = useCallback(
    /**
     * ESLINT: no-use-before-define | BIOME: noInvalidUseBeforeDeclaration, see `https://eslint.org/docs/latest/rules/no-use-before-define`
     * the reason why not use arrow function instead normal function is for recursive jobs
     */
    function checkActive(path?: string, children?: ISidebarMenu[]): boolean {
      const currentPath = location.pathname;
      const matchPath = (p: string) => currentPath === p || currentPath.startsWith(`${p}/`);

      if (children && children.length > 0) {
        return children.some((sub) => checkActive(sub.path, sub.children));
      }
      return path ? matchPath(path) : false;
    },
    [location.pathname]
  );

  const toggleSubmenu = (menuName: string) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleNavigate = (path: string) => {
    const currentPath = location.pathname;
    session.remove("sessionURL");
    session.set<string>({ storage: "sessionURL", data: currentPath });

    void navigate(path);

    // toggleSidebar(!(window.innerWidth < 1024));

    // const closing = Object.fromEntries(Object.entries(submenuOpen).map(([key]) => [key, false]));
    // setSubmenuOpen((prev) => ({ ...prev, ...closing }));
  };

  useEffect(() => {
    const [code, response] = handleInit(sidebarMenu);

    if (code !== 0) {
      console.log(response);
      void navigate("/beranda");
      return;
    }

    setLoading(false);
  }, [handleInit, navigate, sidebarMenu]);

  return {
    Link,
    submenuOpen,
    sidebarMenus,
    location,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    isSidebarOpen,
    sidebarWidth,
    isMenuActive,
    handleReturn,
    handleNavigate,
    toggleSubmenu,
  };
};

export const useRecursiveMenuItem = ({
  item,
  level = 0,
  sidebarContext,
}: RecursiveMenuItemProps<ReturnType<typeof useSidebar>>) => {
  const { Link, submenuOpen, ChevronDown, ChevronRight, isMenuActive, handleNavigate, toggleSubmenu } = sidebarContext;

  const { name, icon: Icon, path, children } = item;
  const isParent = Array.isArray(children) && children.length > 0;

  // Karena kita membuang path pada parent di useSidebar, kita fallback ke string kosong untuk isMenuActive
  const safePath = path ?? "";
  const isActive = isMenuActive(safePath, children);
  const isOpen = submenuOpen[name];

  // Ukuran icon mengecil seiring bertambahnya kedalaman level (opsional untuk hierarki visual)
  const iconSize = level === 0 ? 20 : 16;

  // Kalkulasi lekukan (padding-left) otomatis berdasarkan kedalaman level.
  // Base padding adalah 0.75rem (px-3), setiap level menambah 1.25rem.
  const paddingLeft = `pl-[${0.75 + level * 1.25}rem]!`;

  return {
    baseValue: {
      isParent,
      name,
      paddingLeft,
      isActive,
      iconSize,
      newLevel: level,
      isOpen,
      children,
      newSidebarContext: sidebarContext,
      safePath,
    },
    baseComponent: { Icon, Link, ChevronDown, ChevronRight },
    baseFunction: { handleNavigate, toggleSubmenu },
  };
};
