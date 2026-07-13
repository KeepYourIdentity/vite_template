import { useRouteError } from "react-router-dom";
import ErrorUI from "./ErrorUI";

export default function PageErrorBoundary() {
  const error = useRouteError();

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "statusText" in error && typeof error.statusText === "string"
        ? error.statusText
        : typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
          ? error.message
          : "Terjadi kesalahan internal pada halaman ini.";

  const rawError = error instanceof Error ? (error.stack ?? error) : error;

  return <ErrorUI title="Halaman Bermasalah" message={errorMessage} rawError={rawError} />;
}
