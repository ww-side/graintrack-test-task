import { Toaster } from 'react-hot-toast';
import { Theme } from '@radix-ui/themes';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/app/routeTree.gen.ts';
import { useAuth } from '@/shared/hooks/use-auth.ts';

export default function App() {
  const auth = useAuth();
  const router = createRouter({
    routeTree,
    context: { auth: undefined! },
  });

  return (
    <Theme>
      <RouterProvider router={router} context={{ auth }} />
      <Toaster position="bottom-left" reverseOrder={false} />
    </Theme>
  );
}
