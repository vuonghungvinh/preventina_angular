import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserType } from '../types';
import { ApplicationState } from '../state';
import { getUserSelector } from '../state/reducers';
import * as authActions from '../state';

@Injectable()
export class UserService {
  user$: Observable<UserType> = this.store.let(getUserSelector);
  isAuth$: Observable<boolean> = this.user$.map((user: UserType) => !!user);

  constructor(private store: Store<ApplicationState>) {}

  login(data) {
    this.store.dispatch(new authActions.AuthLoginAction(data));
  }

  logout() {
    this.store.dispatch(new authActions.AuthCleanAction());
  }
}
