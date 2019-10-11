import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { ThingType } from '../../../types';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ThingsActionTypes = {
  THINGS_LOAD: type('THINGS_LOAD'),
  THINGS_LOAD_SUCCESS: type('THINGS_LOAD_SUCCESS'),
  THINGS_LOAD_FAIL: type('THINGS_LOAD_FAIL'),
  THING_UPDATE: type('THING_UPDATE')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ThingsLoadAction implements Action {
  type = ThingsActionTypes.THINGS_LOAD;

  constructor() { }
}

export class ThingsLoadSuccessAction implements Action {
  type = ThingsActionTypes.THINGS_LOAD_SUCCESS;

  constructor(public payload: ThingType[]) { }
}

export class ThingsLoadFailAction implements Action {
  type = ThingsActionTypes.THINGS_LOAD_FAIL;

  constructor() { }
}

export class ThingUpdateAction implements Action {
  type = ThingsActionTypes.THING_UPDATE;
  constructor(public payload: ThingType) { };
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ThingsActions = [
  ThingsLoadAction,
  ThingsLoadSuccessAction,
  ThingsLoadFailAction,
  ThingUpdateAction
];
