import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { UserType } from '../../../types';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const AuthActionTypes = {
  AUTH_CHECK_INITIAL_STATE: type('AUTH_CHECK_INITIAL_STATE'),
  AUTH_CHECK_HAS_TOKEN: type('AUTH_CHECK_HAS_TOKEN'),
  AUTH_CHECK_HAS_NO_TOKEN: type('AUTH_CHECK_HAS_NO_TOKEN'),
  AUTH_LOAD_USER: type('AUTH_LOAD_USER'),
  AUTH_LOAD_USER_SUCCESS: type('AUTH_LOAD_USER_SUCCESS'),
  AUTH_LOAD_USER_FAIL: type('AUTH_LOAD_USER_FAIL'),
  AUTH_LOGIN: type('AUTH_LOGIN'),
  AUTH_LOGIN_SUCCESS: type('AUTH_LOGIN_SUCCESS'),
  AUTH_LOGIN_FAIL: type('AUTH_LOGIN_FAIL'),
  AUTH_SET_TOKEN: type('AUTH_SET_TOKEN'),
  AUTH_CLEAN: type('AUTH_CLEAN')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AuthCheckInitialStateAction implements Action {
  type = AuthActionTypes.AUTH_CHECK_INITIAL_STATE;

  constructor() { }
}

export class AuthCheckHasTokenAction implements Action {
  type = AuthActionTypes.AUTH_CHECK_HAS_TOKEN;

  constructor(public payload: string) { }
}

export class AuthCheckHasNoTokenAction implements Action {
  type = AuthActionTypes.AUTH_CHECK_HAS_NO_TOKEN;

  constructor() { }
}

export class AuthLoadUserAction implements Action {
  type = AuthActionTypes.AUTH_LOAD_USER;

  constructor(public payload: string) { }
}

export class AuthLoadUserSuccessAction implements Action {
  type = AuthActionTypes.AUTH_LOAD_USER_SUCCESS;

  constructor(public payload: any) { }
}

export class AuthLoadUserFailAction implements Action {
  type = AuthActionTypes.AUTH_LOAD_USER_FAIL;

  constructor() { }
}

export class AuthLoginAction implements Action {
  type = AuthActionTypes.AUTH_LOGIN;

  constructor(public payload: any) { }
}

export class AuthLoginSuccessAction implements Action {
  type = AuthActionTypes.AUTH_LOGIN_SUCCESS;

  constructor(public payload: UserType) { }
}

export class AuthLoginFailAction implements Action {
  type = AuthActionTypes.AUTH_LOGIN_FAIL;

  constructor() { }
}

export class AuthSetTokenAction implements Action {
  type = AuthActionTypes.AUTH_SET_TOKEN;

  constructor(public payload: string) { }
}

export class AuthCleanAction implements Action {
  type = AuthActionTypes.AUTH_CLEAN;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions = [
  AuthCheckInitialStateAction,
  AuthCheckHasTokenAction,
  AuthCheckHasNoTokenAction,
  AuthLoadUserAction,
  AuthLoadUserSuccessAction,
  AuthLoadUserFailAction,
  AuthLoginAction,
  AuthLoginSuccessAction,
  AuthLoginFailAction,
  AuthSetTokenAction
];
