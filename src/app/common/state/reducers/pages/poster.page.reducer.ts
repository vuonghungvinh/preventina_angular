import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as posterPageActions from '../../actions/pages/poster.page.actions';
import * as posterActions from '../../actions/data/poster.actions';
import { PosterType } from '../../../types/poster.type';

export interface State {
  poster: PosterType;
}

const initialState: State = {
  poster: null
};

/**
 * POSTER_PAGE_SET & POSTER_UPDATE & POSTER_UPDATE_STORE & POSTER_CREATE_SUCCESS: Assign payload to poster
 * POSTER_PAGE_CLEAN: Set poster to null
 */
export function PosterPageReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case posterPageActions.PosterPageActionTypes.POSTER_PAGE_SET:
    case posterActions.PosterActionTypes.POSTER_UPDATE:
    case posterActions.PosterActionTypes.POSTER_UPDATE_STORE:
    case posterActions.PosterActionTypes.POSTER_CREATE_SUCCESS: {
      const _state = state;
      const _action = action;
      const _new_poster = _.assign({}, state.poster, action.payload);
      const _new_state = _.assign({}, state, {
        poster: _new_poster
      });
      return _new_state;
    }

    case posterPageActions.PosterPageActionTypes.POSTER_PAGE_CLEAN: {
      return _.assign({}, state, {
        poster: null
      });
    }

    default: {
      return state;
    }
  }
}

export function getPoster(state$: Observable<State>) {
  return state$.select(s => s.poster);
}
