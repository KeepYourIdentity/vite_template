import { PageErrorBoundary } from "core/assets/static";
import { RouteLazyImport, session } from "core/utils";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const UnderConstruction = RouteLazyImport(() => import("core/assets/static/UnderConstructionUI"), "default");

export default function AppRouter() {
  const lastPath = session.get<string>("sessionURL") ?? "/";
  return (
    <RouterProvider
      router={createBrowserRouter(
        [
          {
            errorElement: <PageErrorBoundary />,
            children: [
              {
                path: "/login",
                lazy: UnderConstruction,
              },
            ],
          },
          {
            path: "*",
            element: <Navigate to={lastPath || "/login"} replace />,
          },
        ],
      )}
    />
  );
}
