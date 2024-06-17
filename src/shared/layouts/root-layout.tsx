import { type ReactNode } from 'react';
import Header from '@/app/components/header.tsx';
import { useAuth } from '@/shared/hooks/use-auth.ts';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isLogged } = useAuth();
  const isAuthenticated = isLogged();

  return (
    <>
      {isAuthenticated && <Header />}
      <main className="m-4">{children}</main>
    </>
  );
}
