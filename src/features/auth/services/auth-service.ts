import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { singleton } from 'tsyringe';
import { messages } from '@/core/config/messages.ts';

type ResponseDataType = {
  token?: string;
  username?: string;
};

type AuthResponse = {
  success: boolean;
  data: ResponseDataType;
};

@singleton()
export class AuthService {
  login(username: string, password: string) {
    if (username === 'admin' && password === 'helloH1$hh') {
      return of<AuthResponse>({
        success: true,
        data: { token: 'mock-token', username },
      }).pipe(delay(1000));
    }
    return throwError(() => new Error(messages.invalidCredentials)).pipe(
      delay(1000),
    );
  }
}
