import { createFileRoute, redirect } from '@tanstack/react-router';
import HomePage from '@/pages/home-page.tsx';
import { routes } from '@/core/config/routes.ts';

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;

    if (!isLogged()) {
      throw redirect({ to: routes.auth });
    }
  },
});
