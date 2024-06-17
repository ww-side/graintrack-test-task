import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import RootLayout from '@/shared/layouts/root-layout.tsx';
import { AuthContext } from '@/shared/hooks/use-auth.ts';

type RouterContext = {
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
  notFoundComponent: () => {
    return <p>This page doesn't exist!</p>;
  },
});
