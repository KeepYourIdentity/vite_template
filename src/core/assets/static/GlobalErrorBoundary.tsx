import { Component } from "react";
import ErrorUI from "./ErrorUI.backup2";

import type { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class GlobalErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Tertangkap oleh Global Error Boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorUI
          title="Terjadi Kesalahan Sistem"
          message="Sistem mengalami gangguan yang tidak terduga. Silakan muat ulang halaman."
          rawError={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}
