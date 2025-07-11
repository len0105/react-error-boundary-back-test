import { ErrorComponent, useLocation } from '@tanstack/react-router';
import { Suspense, useEffect, type ReactElement } from 'react';
import Loading from './Loading';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export function Error({ error }: { error: Error }) {
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return <ErrorComponent error={error} />;
}

export function ErrorAndSuspenseBoundary({
  children
}: {
  children: ReactElement;
}) {
  const currentPathName = useLocation({
    select: (location) => location.pathname
  });

  return (
    <ErrorBoundary key={currentPathName} fallbackRender={Error}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
