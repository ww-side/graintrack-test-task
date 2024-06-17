import { createFileRoute, redirect } from '@tanstack/react-router';
import AuthPage from '@/pages/auth-page.tsx';

export const Route = createFileRoute('/auth/')({
  component: AuthPage,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;

    if (isLogged()) {
      throw redirect({ to: '/' });
    }
  },
});
