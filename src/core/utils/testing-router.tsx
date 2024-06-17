import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { render } from '@testing-library/react';
import RootLayout from '@/shared/layouts/root-layout.tsx';
import HomePage from '@/pages/home-page.tsx';
import AboutPage from '@/pages/about-page.tsx';

function createTestRouter() {
  const rootRoute = createRootRoute({
    component: () => (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
  });

  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  });

  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: AboutPage,
  });

  return createRouter({
    routeTree: rootRoute.addChildren([homeRoute, aboutRoute]),
    history: createMemoryHistory(),
  });
}

export function renderWithContext() {
  const router = createTestRouter();
  router.history.push('/');
  return render(<RouterProvider router={router} />);
}
