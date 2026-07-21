import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarStore } from "src/components/store";
import { logout } from "src/utils";

export const useNavbar = () => {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const haveSidebar = useSidebarStore((state) => state.haveSidebar);
  const setHaveSidebar = useSidebarStore((state) => state.setHaveSidebar);

  const handleToggle = useCallback(() => {
    if (haveSidebar) {
      toggleSidebar();
    }
    return;
  }, [haveSidebar, toggleSidebar]);

  const handleLogout = useCallback(async () => {
    const [_message, _code] = await logout({ callApi: false });

    [toggleSidebar, setHaveSidebar].forEach((fn) => {
      fn(false);
    });

    // toggleSidebar(false);
    // setHaveSidebar(false);

    await navigate("/login", { replace: true });
    return;
  }, [navigate, toggleSidebar, setHaveSidebar]);

  return { haveSidebar, handleLogout, handleToggle };
};
