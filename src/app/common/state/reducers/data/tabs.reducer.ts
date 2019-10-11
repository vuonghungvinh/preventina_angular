import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as tabsActions from '../../actions/data/tabs.actions';
import { TabType } from '../../../types/tab.type';

export interface State {
  tabs: TabType[];
}

const initialState: State = {
  tabs: []
};

/**
 * TABS_REORDER: Reorder tabs
 */
export function TabsReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case tabsActions.TabsActionTypes.TABS_REORDER: {
      return _.assign({}, state, {
          tabs: _.map(action.payload, (item: TabType, index) => {
            item.level = index;

            return _.assign({}, item);
          })
        }
      );
    }
    case tabsActions.TabsActionTypes.TABS_LOAD_SUCCESS: {
      return {tabs: action.payload}
    }

    case tabsActions.TabsActionTypes.TABS_LOAD_FAIL: {
      return state;
    }

    default: {
      return state;
    }
  }
}

export function getTabs(state$: Observable<State>) {
  return state$.select(s => s.tabs);
}
