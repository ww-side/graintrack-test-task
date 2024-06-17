import { createFileRoute, redirect } from '@tanstack/react-router';
import AuthPage from '@/pages/auth-page.tsx';
import { routes } from '@/core/config/routes.ts';

export const Route = createFileRoute('/auth/')({
  component: AuthPage,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;

    if (isLogged()) {
      throw redirect({ to: routes.home });
    }
  },
});
