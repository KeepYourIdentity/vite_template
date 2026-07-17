import { useEnvStore } from "core/store";

import type { ReactElement } from "react";

export default function App(): ReactElement {
  const env = useEnvStore((state) => state.env);
  return (
    <>
      <title>{env.WEBSITE_NAME}</title>
      <meta name="description" content={env.WEBSITE_DESCRIPTION} />
      <link rel="icon" type="image/svg+xml" href="/is3.svg" />
      <div
        className="relative flex-1 min-h-0 flex flex-col bg-fixed bg-linear-to-br from-gray-50 via-50% to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500 overflow-hidden"
        data-testid="background-backdrop"
      >
        <div className="relative flex-1 min-h-0 xy-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-400/80 blur-3xl opacity-90 md:animate-pulse shadow-[0_0_120px_rgba(248,113,113,0.45)]"
              data-testid="background-orb"
            />
            <div
              className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-400/80 blur-3xl opacity-90 md:animate-pulse shadow-[0_0_120px_rgba(56,189,248,0.45)]"
              data-testid="background-orb"
            />
          </div>
          <div className="flex-1 min-h-0 xy-center">lorem</div>
        </div>
      </div>
    </>
  );
}
