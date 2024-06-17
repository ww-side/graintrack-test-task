import { createFileRoute, redirect } from '@tanstack/react-router';
import AboutPage from '@/pages/about-page.tsx';

export const Route = createFileRoute('/about/')({
  component: AboutPage,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth;

    if (!isLogged()) {
      throw redirect({ to: '/auth' });
    }
  },
});
