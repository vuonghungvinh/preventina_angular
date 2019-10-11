import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as svgsActions from '../../actions/data/svgs.actions';
import { SvgType } from '../../../types/svg.type';

export interface State {
  svgs: SvgType[];
}

const initialState: State = {
  svgs: []
};

/**
 * SVGS_REORDER: Reorder svgs
 */
export function SvgsReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case svgsActions.SvgsActionTypes.SVGS_LOAD_SUCCESS: {
      return {svgs: action.payload}
    }

    case svgsActions.SvgsActionTypes.SVGS_LOAD_FAIL: {
      return state;
    }
    case svgsActions.SvgsActionTypes.SVGS_LOAD_ALL_SUCCESS: {
      return {svgs: action.payload}
    }

    case svgsActions.SvgsActionTypes.SVGS_LOAD_ALL_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
}

export function getSvgs(state$: Observable<State>) {
  return state$.select(s => s.svgs);
}
