import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LoadingUI } from "~/core/assets/static/";

import type { ReactElement, ReactNode } from "react";

interface IChildren {
  children?: ReactNode;
}

export function SuspenseHandler({ children }: IChildren): ReactElement {
  return (
    <Suspense fallback={<LoadingUI />}>
      {/* <Outlet /> */}
      {children ?? (<Outlet />)}
    </Suspense>
  );
}
