import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { SvgType, SvgParamType } from '../../../types';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const SvgsActionTypes = {
  SVGS_LOAD: type('SVGS_LOAD'),
  SVGS_LOAD_SUCCESS: type('SVGS_LOAD_SUCCESS'),
  SVGS_LOAD_FAIL: type('SVGS_LOAD_FAIL'),
  SVGS_LOAD_ALL: type('SVGS_LOAD_ALL'),
  SVGS_LOAD_ALL_SUCCESS: type('SVGS_LOAD_ALL_SUCCESS'),
  SVGS_LOAD_ALL_FAIL: type('SVGS_LOAD_ALL_FAIL')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SvgsLoadAllAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD_ALL;

  constructor() { }
}

export class SvgsLoadAllSuccessAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD_ALL_SUCCESS;

  constructor(public payload: SvgType[]) { }
}

export class SvgsLoadAllFailAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD_ALL_FAIL;

  constructor() { }
}

export class SvgsLoadAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD;

  constructor(public payload: SvgParamType) { }
}

export class SvgsLoadSuccessAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD_SUCCESS;

  constructor(public payload: SvgType) { }
}

export class SvgsLoadFailAction implements Action {
  type = SvgsActionTypes.SVGS_LOAD_FAIL;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SvgsActions = [
  SvgsLoadAction,
  SvgsLoadSuccessAction,
  SvgsLoadFailAction,
  SvgsLoadAllAction,
  SvgsLoadAllSuccessAction,
  SvgsLoadAllFailAction
];
