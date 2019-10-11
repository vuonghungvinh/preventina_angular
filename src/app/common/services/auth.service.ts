import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { COOKIE_AUTH } from '../config';

@Injectable()
export class AuthService {
  getAuthToken(): string {
    return Cookie.get(COOKIE_AUTH);
  }

  removeAuthToken(): void {
    Cookie.delete(COOKIE_AUTH);
  }

  putTokenToStorage(token, days): void {
    Cookie.set(COOKIE_AUTH, token, days);
  }
}
