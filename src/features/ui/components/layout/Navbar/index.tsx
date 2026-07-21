import { Menu, PowerIcon } from "lucide-react";
import Button from "src/components/ui/Button";
import { siteConfig } from "src/configs/base";
import { useNavbar } from "./useIndex";

import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
  const { haveSidebar, handleToggle, handleLogout } = useNavbar();
  const { title, description, version } = siteConfig;

  return (
    <header className="w-full h-16 px-2 flex flex-row gap-2 items-center bg-transparent backdrop-blur-md">
      <Button
        aria-label={haveSidebar ? "Toggle Sidebar" : undefined}
        className={`p-2 rounded-md enable:hover:bg-slate-700/25 transition-all ${!haveSidebar ? "mr-4" : "mr-2"}`}
        disabled={!haveSidebar}
        needAnimation={!haveSidebar}
        onClick={() => handleToggle()}
        type="button"
      >
        {haveSidebar && <Menu className="size-6" />}
      </Button>

      <div className="p-2 rounded bg-primary">{title}</div>
      <div className="p-2 rounded max-h-full flex-auto flex flex-row gap-1">
        <div className="flex flex-row gap-2 rounded bg-primary bg-clip-text text-transparent! font-bold">
          <div className="">{description}</div>
          <div>{version}</div>
        </div>
      </div>

      <Button className="p-2 flex flex-row gap-1 bg-danger" onClick={() => handleLogout()}>
        <PowerIcon size={22} />
        <span className="text-sm font-medium">Keluar</span>
      </Button>
      <div className={`p-2 ${!haveSidebar ? "mr-4" : "mr-5"}`} />
    </header>
  );
}
