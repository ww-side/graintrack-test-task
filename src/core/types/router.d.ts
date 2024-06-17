import { router } from '../../app/routes/router.ts';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
