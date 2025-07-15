import { ErrorComponent, useLocation } from '@tanstack/react-router';
import { Suspense, type ReactElement } from 'react';
import Loading from './Loading';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export function QueryErrorComponent({
  error,
  resetErrorBoundary
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      <h2>ErrorBoundaryのエラー</h2>
      <ErrorComponent error={error} />
      <button onClick={resetErrorBoundary}>再試行</button>
    </div>
  );
}

export function ErrorAndSuspenseBoundary({
  children
}: {
  children: ReactElement;
}) {
  const currentPathName = useLocation({
    select: (location) => location.pathname
  });

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      key={currentPathName}
      fallbackRender={QueryErrorComponent}
      onReset={queryErrorResetBoundary.reset}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
