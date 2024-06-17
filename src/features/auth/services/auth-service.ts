import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { singleton } from 'tsyringe';

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
    return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
  }
}
