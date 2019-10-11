import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from '../../../services';
import { UserEndpoint } from '../../../endpoints';
import * as authActions from '../../actions/data/auth.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userEndpoint: UserEndpoint,
    private router: Router
  ) {}

  @Effect() init$: Observable<Action> = this.actions$
    .take(1)
    .mapTo(this.authService.getAuthToken())
    .map(token => !_.isEmpty(token) ? new authActions.AuthCheckHasTokenAction(token) : new authActions.AuthCheckHasNoTokenAction());

  @Effect() appHasToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_HAS_TOKEN)
    .map(({ payload }) => new authActions.AuthLoadUserAction(payload));

  @Effect() loadUserIfThereIsToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER)
    .switchMap(({ payload }) => {
        return this.userEndpoint.getCurrentUser(payload)
          .map(user => new authActions.AuthLoadUserSuccessAction(user))
          .catch(error => Observable.of(new authActions.AuthLoadUserFailAction()));
      }
    ); ;

  /*@Effect({ dispatch: false }) appHasNoToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CHECK_HAS_NO_TOKEN)
    .do(() => console.log('EVENT_USER_IS_NOT_AUTHORISED'));*/

  /*@Effect() userLoadSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER_SUCCESS)
    .map(({ payload }) => new authActions.AuthSetTokenAction(payload.dailyKey));*/

  @Effect() userLoadFail$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOAD_USER_FAIL)
    .map(() => new authActions.AuthCleanAction());

  @Effect() setToken$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_SET_TOKEN)
    .do(({ payload }) => this.authService.putTokenToStorage(payload, 365));

  @Effect({ dispatch: false }) authClean$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_CLEAN)
    .do(() => {
      this.authService.removeAuthToken();
      console.log('EVENT_USER_IS_NOT_AUTHORISED');
    });

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOGIN)
    .switchMap(({ payload }) => {
        return this.userEndpoint.login(payload)
          .map(user => new authActions.AuthLoginSuccessAction(user))
          .catch(error => Observable.of(new authActions.AuthLoginFailAction()));
      }
    );

  @Effect({ dispatch: false }) loginSuccess$: Observable<Action> = this.actions$
    .ofType(authActions.AuthActionTypes.AUTH_LOGIN_SUCCESS)
    .do(({ payload }) => {
      this.authService.putTokenToStorage(payload.dailyKey, 365);
      this.router.navigate(['']);
    });
}
