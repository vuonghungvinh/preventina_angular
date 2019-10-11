import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as posterActions from '../../actions/data/poster.actions';
import { PosterType } from '../../../types/poster.type';

export interface State {
  posters: PosterType[];
  postersAreLoaded: boolean;
}

const initialState: State = {
  posters: [],
  postersAreLoaded: false
};

/**
 * POSTER_LOAD_ALL_SUCCESS: Set posters as payload. Set postersAreLoaded as true
 * POSTER_DELETE_SUCCESS: Remove item whose id is payload.id from posters
 * POSTER_DELETE_SUCCESS: Append payload to posters
 * POSTER_UPDATE_SUCCESS & POSTER_UPDATE_STORE: Find poster in posters whose tempId is payload.tempId, replace it with payload
 */
export function PostersReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case posterActions.PosterActionTypes.POSTER_LOAD_ALL_SUCCESS: {
      return _.assign({}, state, {
        posters: action.payload,
        postersAreLoaded: true
      });
    }

    case posterActions.PosterActionTypes.POSTER_DELETE_SUCCESS: {
      return _.assign({}, state, {
        posters: _.filter(state.posters, (item) => item.id !== action.payload.id)
      });
    }

    case posterActions.PosterActionTypes.POSTER_CREATE_SUCCESS: {
      return _.assign({}, state, {
        posters: [...state.posters, action.payload]
      });
    }

    case posterActions.PosterActionTypes.POSTER_UPDATE_SUCCESS:
    case posterActions.PosterActionTypes.POSTER_UPDATE_STORE: {
      const posterIndex = _.findIndex(state.posters, { tempId: action.payload.tempId });

      return _.assign({}, state, {
        posters: [
          ...state.posters.slice(0, posterIndex),
          _.assign(state.posters[posterIndex], action.payload),
          ...state.posters.slice(posterIndex + 1)
        ]
      });
    }

    default: {
      return state;
    }
  }
}

export function getPosters(state$: Observable<State>) {
  return state$.select(s => s.posters);
}

export function getPostersAreLoaded(state$: Observable<State>) {
  return state$.select(s => s.postersAreLoaded);
}
