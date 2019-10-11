import { Action } from '@ngrx/store';

import { type } from '../../../services/utilities.service';
import {PosterType} from '../../../types/poster.type';
import {ThingType} from '../../../types/thing.type';
import {GearComponentDataType} from '../../../types/gear-component-data.type';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const PosterActionTypes = {
  POSTER_LOAD: type('POSTER_LOAD'),
  POSTER_LOAD_SUCCESS: type('POSTER_LOAD_SUCCESS'),
  POSTER_LOAD_FAIL: type('POSTER_LOAD_FAIL'),
  POSTER_SAVE: type('POSTER_SAVE'),
  POSTER_CREATE: type('POSTER_CREATE'),
  POSTER_CREATE_SUCCESS: type('POSTER_CREATE_SUCCESS'),
  POSTER_CREATE_FAIL: type('POSTER_CREATE_FAIL'),
  POSTER_UPDATE: type('POSTER_UPDATE'),
  POSTER_UPDATE_SUCCESS: type('POSTER_UPDATE_SUCCESS'),
  POSTER_UPDATE_FAIL: type('POSTER_UPDATE_FAIL'),
  POSTER_UPDATE_STORE: type('POSTER_UPDATE_STORE'),
  POSTER_DELETE: type('POSTER_DELETE'),
  POSTER_DELETE_SUCCESS: type('POSTER_DELETE_SUCCESS'),
  POSTER_DELETE_FAIL: type('POSTER_DELETE_FAIL'),
  POSTER_CHANGE_THING: type('POSTER_CHANGE_THING'),
  POSTER_CHANGE_THING_COMMENT_POSITION: type('POSTER_CHANGE_THING_COMMENT_POSITION'),
  POSTER_CHANGE_THING_POSITION: type('POSTER_CHANGE_THING_POSITION'),
  POSTER_LOAD_ALL: type('POSTER_LOAD_ALL'),
  POSTER_LOAD_ALL_SUCCESS: type('POSTER_LOAD_ALL_SUCCESS'),
  POSTER_LOAD_ALL_FAIL: type('POSTER_LOAD_ALL_FAIL')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class PosterLoadAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_ALL;

  constructor(public payload?: number) { }
}

export class PosterLoadSuccessAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class PosterLoadFailAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_FAIL;

  constructor() { }
}

export class PosterCreateAction implements Action {
  type = PosterActionTypes.POSTER_CREATE;

  constructor(public payload: PosterType) { }
}

export class PosterSaveAction implements Action {
  type = PosterActionTypes.POSTER_SAVE;

  constructor(public payload: PosterType) { }
}

export class PosterCreateSuccessAction implements Action {
  type = PosterActionTypes.POSTER_CREATE_SUCCESS;

  constructor(public payload: PosterType) { }
}

export class PosterCreateFailAction implements Action {
  type = PosterActionTypes.POSTER_CREATE_FAIL;

  constructor() { }
}

export class PosterUpdateAction implements Action {
  type = PosterActionTypes.POSTER_UPDATE;

  constructor(public payload: PosterType) { }
}

export class PosterUpdateSuccessAction implements Action {
  type = PosterActionTypes.POSTER_UPDATE_SUCCESS;

  constructor(public payload: PosterType) { }
}

export class PosterUpdateFailAction implements Action {
  type = PosterActionTypes.POSTER_UPDATE_FAIL;

  constructor() { }
}

export class PosterUpdateStoreAction implements Action {
  type = PosterActionTypes.POSTER_UPDATE_STORE;

  constructor(public payload: PosterType) { }
}

export class PosterDeleteAction implements Action {
  type = PosterActionTypes.POSTER_DELETE;

  constructor(public payload: PosterType) { }
}

export class PosterDeleteSuccessAction implements Action {
  type = PosterActionTypes.POSTER_DELETE_SUCCESS;

  constructor(public payload: PosterType) { }
}

export class PosterDeleteFailAction implements Action {
  type = PosterActionTypes.POSTER_DELETE_FAIL;

  constructor() { }
}

export class PosterChangeThingsAction implements Action {
  type = PosterActionTypes.POSTER_CHANGE_THING;

  constructor(public payload: {posterId: any; thing: ThingType}) { }
}

export class PosterChangeThingCommentPositionAction implements Action {
  type = PosterActionTypes.POSTER_CHANGE_THING_COMMENT_POSITION;

  constructor(public payload: { thingType: string; position: [number]; }) { }
}

export class PosterLoadAllAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_ALL;

  constructor() { }
}

export class PosterLoadAllSuccessAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_ALL_SUCCESS;

  constructor(public payload: PosterType[]) { }
}

export class PosterLoadAllFailAction implements Action {
  type = PosterActionTypes.POSTER_LOAD_ALL_FAIL;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PosterActions = [
  PosterLoadAction,
  PosterLoadSuccessAction,
  PosterLoadFailAction,
  PosterSaveAction,
  PosterCreateAction,
  PosterCreateSuccessAction,
  PosterCreateFailAction,
  PosterUpdateAction,
  PosterUpdateSuccessAction,
  PosterUpdateFailAction,
  PosterUpdateStoreAction,
  PosterDeleteAction,
  PosterDeleteSuccessAction,
  PosterDeleteFailAction,
  PosterChangeThingsAction,
  PosterChangeThingCommentPositionAction,
  PosterLoadAllAction,
  PosterLoadAllSuccessAction,
  PosterLoadAllFailAction
];
