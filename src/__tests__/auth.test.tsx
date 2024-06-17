import { vi, describe, expect, it } from 'vitest';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createMemoryHistory } from '@tanstack/react-router';
import App from '@/app/components/app.tsx';

vi.mock('@/features/auth/services/auth-service.ts', () => ({
  AuthService: vi.fn().mockImplementation(() => ({
    login: vi.fn((username: string, password: string) => {
      if (username === 'admin333' && password === 'helloH1$hh') {
        return throwError(() => new Error('Invalid credentials')).pipe(
          delay(1000),
        );
      }
      return of({
        success: true,
        data: { token: 'mock-token', username },
      }).pipe(delay(1000));
    }),
  })),
}));

describe('Auth test case', () => {
  it('Enter a valid credentials', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(<App />);
    await waitFor(() => expect(getByTestId('auth-page')).toBeInTheDocument());

    const usernameInput = getByTestId('login-username');
    const passwordInput = getByTestId('login-password');
    const submitBtn = getByTestId('login-btn');

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'helloH1$hh');
    await userEvent.click(submitBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('Enter a not valid credentials', async () => {
    const { getByTestId, getByText } = render(<App />);
    await waitFor(() => expect(getByTestId('auth-page')).toBeInTheDocument());

    const usernameInput = getByTestId('login-username');
    const passwordInput = getByTestId('login-password');
    const submitBtn = getByTestId('login-btn');

    await userEvent.type(usernameInput, 'admin333');
    await userEvent.type(passwordInput, 'helloH1$hh');
    await userEvent.click(submitBtn);

    expect(getByText('Invalid credentials')).toBeInTheDocument();
  });
});
