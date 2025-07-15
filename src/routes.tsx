import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useRouter
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { queryClient } from './query';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import Loading from './Loading';
import {
  aboutQueryOptions,
  errorQueryOptions,
  indexQueryOptions
} from './queryOptions';
import { ErrorAndSuspenseBoundary } from './ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Button } from '@mui/material';

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ErrorAndSuspenseBoundary>
        <>
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>{' '}
            <Link to="/error" className="[&.active]:font-bold">
              Error
            </Link>
          </div>
          <hr />
          <Outlet />
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </ErrorAndSuspenseBoundary>
    </QueryClientProvider>
  ),
  pendingComponent: () => <Loading />,
  errorComponent: function ErrorComponent({ error }: { error: Error }) {
    const router = useRouter();
    return (
      <div className="p-2">
        <h3>Routerが定義したError</h3>
        <pre>{error.stack}</pre>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            router.history.back();
          }}
        >
          戻る
        </Button>
      </div>
    );
  }
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(indexQueryOptions()),
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  }
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(aboutQueryOptions()),
  component: function About() {
    return (
      <>
        <div className="p-2">Hello from About!</div>
      </>
    );
  }
});

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/error',
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(errorQueryOptions()),
  component: function Error() {
    return (
      <>
        <div className="p-2">Error!</div>
      </>
    );
  }
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, errorRoute]);
export const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
});
