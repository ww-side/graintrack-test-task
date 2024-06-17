import 'reflect-metadata';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { map } from 'rxjs';
import { container } from 'tsyringe';
import { AuthService } from '@/features/auth/services/auth-service.ts';
import { SessionService } from '@/features/auth/services/session-service.ts';

const authService = container.resolve(AuthService);
const sessionService = container.resolve(SessionService);

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const tokenSubscription = sessionService.token.subscribe(setToken);
    const usernameSubscription = sessionService.username.subscribe(setUsername);

    return () => {
      tokenSubscription.unsubscribe();
      usernameSubscription.unsubscribe();
    };
  }, []);

  const login = (username: string, password: string) => {
    return authService.login(username, password).pipe(
      map(response => {
        if (response.success) {
          sessionService.setToken(
            response.data.token!,
            response.data.username!,
          );
          Cookies.set('token', response.data.token!);
          Cookies.set('username', response.data.username!);
        }
        return response;
      }),
    );
  };

  const logout = () => {
    sessionService.clearToken();
    Cookies.remove('token');
    Cookies.remove('username');
  };

  const isLogged = () => !!Cookies.get('token');

  return { token, username, login, logout, isLogged };
}

export type AuthContext = ReturnType<typeof useAuth>;
