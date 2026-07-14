import PageErrorBoundary from "core/assets/static/PageErrorBoundary";
import { SuspenseHandler } from "core/utils/SuspenseHandler";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

export default function AppRoutes() {
  const lastPath = "";
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          errorElement: <PageErrorBoundary />,
          children: [
            {
              path: "/login",
              element: <>lorem</>,
            },
          ],
        },
        {
          element: <SuspenseHandler />,
          children: [
            {
              element: <></>,
              errorElement: <PageErrorBoundary />,
            },
          ],
        },
        {
          path: "*",
          element: <Navigate to={lastPath || "/login"} replace />,
        },
      ])}
    />
  );
}
