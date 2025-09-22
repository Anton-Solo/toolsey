"use client";

import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Skeleton } from './Skeleton';

interface LazyErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

const DefaultLoadingFallback = () => (
  <Skeleton height={200} width="100%" rounded />
);

const DefaultErrorFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded">
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
        <svg 
          className="w-6 h-6 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      <p className="text-sm text-gray-600">Failed to load component</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 text-xs text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  </div>
);

export const LazyErrorBoundary: React.FC<LazyErrorBoundaryProps> = ({
  children,
  fallback = <DefaultErrorFallback />,
  loading = <DefaultLoadingFallback />
}) => {
  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={loading}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyErrorBoundary;
