import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Link,
  Outlet
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { queryClient } from './query';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import Loading from './Loading';
import {
  aboutQueryOptions,
  hogeQueryOptions,
  indexQueryOptions
} from './queryOptions';
import { ErrorAndSuspenseBoundary } from './ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <ErrorAndSuspenseBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>{' '}
          <Link to="/hoge" className="[&.active]:font-bold">
            Hoge
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorAndSuspenseBoundary>
  ),
  pendingComponent: () => <Loading />
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

const hogeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hoge',
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(hogeQueryOptions()),
  component: function Hoge() {
    return (
      <>
        <div className="p-2">Hello from Hoge!</div>
      </>
    );
  }
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, hogeRoute]);
export const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
});
