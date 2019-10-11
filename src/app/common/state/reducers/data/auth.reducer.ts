import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as authActions from '../../actions/data/auth.actions';
import { UserType } from '../../../types/user.type';

export interface State {
  token: string;
  user: UserType;
}

const initialState: State = {
  token: null,
  user: null
};

/**
 * AUTH_SET_TOKEN: Set token
 * AUTH_LOGIN_SUCCESS & AUTH_LOAD_USER_SUCCESS: Set user
 * AUTH_CLEAN: set state to initial state
 */
export function AuthReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case authActions.AuthActionTypes.AUTH_SET_TOKEN: {
      return Object.assign({}, state, {
        token: action.payload
      });
    }

    case authActions.AuthActionTypes.AUTH_LOGIN_SUCCESS:
    case authActions.AuthActionTypes.AUTH_LOAD_USER_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    case authActions.AuthActionTypes.AUTH_CLEAN: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export function getToken(state$: Observable<State>): Observable<string> {
  return state$.select(s => s.token);
}

export function getUser(state$: Observable<State>): Observable<UserType> {
  return state$.select(s => s.user);
}
