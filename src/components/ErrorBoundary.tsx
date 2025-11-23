'use client';

import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You could also send this to an error reporting service
    console.error('Token table crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-4 rounded-xl border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-100">
          Something went wrong while rendering the token table. Please reload
          the page.
        </div>
      );
    }

    return this.props.children;
  }
}
