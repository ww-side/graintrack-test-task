import { Link } from '@tanstack/react-router';
import { Separator } from '@radix-ui/themes';
import { useAuth } from '@/shared/hooks/use-auth.ts';

export default function Header() {
  const { username, isLogged, logout } = useAuth();

  return (
    <>
      <header className="p-2 flex gap-2">
        <Link
          to="/"
          className="[&.active]:text-blue-700"
          data-testid="home-page-btn"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="[&.active]:text-blue-700"
          data-testid="about-page-btn"
        >
          About
        </Link>
        {isLogged() && (
          <div className="ml-auto">
            <span className="mr-2">{username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <Separator my="3" size="4" />
    </>
  );
}
