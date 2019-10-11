import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import { PosterType } from '../../../types/poster.type';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const PosterPageActionTypes = {
  POSTER_PAGE_GET: type('POSTER_PAGE_GET'),
  POSTER_PAGE_SET: type('POSTER_PAGE_SET'),
  POSTER_PAGE_CLEAN: type('POSTER_PAGE_CLEAN'),
  POSTER_PAGE_SAVE_POSTER: type('POSTER_PAGE_SAVE_POSTER')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class PosterPageGetAction implements Action {
  type = PosterPageActionTypes.POSTER_PAGE_GET;

  constructor(public payload: number) { }
}

export class PosterPageSetAction implements Action {
  type = PosterPageActionTypes.POSTER_PAGE_SET;

  constructor(public payload: PosterType) { }
}

export class PosterPageCleanAction implements Action {
  type = PosterPageActionTypes.POSTER_PAGE_CLEAN;

  constructor() { }
}

export class PosterPageSavePosterAction implements Action {
  type = PosterPageActionTypes.POSTER_PAGE_SAVE_POSTER;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PosterPageActions = [
  PosterPageGetAction,
  PosterPageSetAction,
  PosterPageCleanAction,
  PosterPageSavePosterAction
];
