import { BehaviorSubject } from 'rxjs';
import { singleton } from 'tsyringe';
import Cookies from 'js-cookie';

@singleton()
export class SessionService {
  private tokenSubject = new BehaviorSubject<string | null>(
    Cookies.get('token') || null,
  );
  private usernameSubject = new BehaviorSubject<string | null>(
    Cookies.get('username') || null,
  );

  get token() {
    return this.tokenSubject.asObservable();
  }

  get username() {
    return this.usernameSubject.asObservable();
  }

  setToken(token: string, username: string) {
    this.tokenSubject.next(token);
    this.usernameSubject.next(username);
  }

  clearToken() {
    this.tokenSubject.next(null);
    this.usernameSubject.next(null);
  }
}
