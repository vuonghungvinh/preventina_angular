import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptorService } from '@covalent/http';

import { API_AUTH_URL } from '../config';
import { UserType } from '../types';
import { makeDefaultHeaders } from '../services/utilities.service';

const LOGIN_API_URL = API_AUTH_URL + 'users/login';
const CHECK_UUID_API_URL = API_AUTH_URL + 'users/uuidcheck/';

@Injectable()
export class UserEndpoint {
  constructor(private http: HttpInterceptorService) {}

  login(credentials): Observable<UserType> {
    return this.http.post(
      LOGIN_API_URL,
      JSON.stringify(credentials),
      makeDefaultHeaders()
    )
      .map(res => res.json())
      .map(data => data.result)
      .publishReplay(1)
      .refCount();
  }

  getCurrentUser(uuid): Observable<UserType> {
    return this.http.get(CHECK_UUID_API_URL + uuid)
      .map(res => res.json())
      .map(data => data.result)
      .publishReplay(1)
      .refCount();
  }
}
