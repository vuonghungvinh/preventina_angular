import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { TabType } from '../../../types';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const TabsActionTypes = {
  TABS_REORDER: type('TABS_REORDER'),
  TABS_LOAD: type('TABS_LOAD'),
  TABS_LOAD_SUCCESS: type('TABS_LOAD_SUCCESS'),
  TABS_LOAD_FAIL: type('TABS_LOAD_FAIL'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class TabsReorderAction implements Action {
  type = TabsActionTypes.TABS_REORDER;

  constructor(public payload: TabType[]) { }
}

export class TabsLoadAction implements Action {
  type = TabsActionTypes.TABS_LOAD;
}

export class TabsLoadSuccessAction implements Action {
  type = TabsActionTypes.TABS_LOAD_SUCCESS;
  constructor(public payload: any){}
}

export class TabsLoadFailAction implements Action {
  type = TabsActionTypes.TABS_LOAD_FAIL;
  constructor() {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TabsActions = [
  TabsReorderAction,
  TabsLoadAction,
  TabsLoadSuccessAction,
  TabsLoadFailAction
];
