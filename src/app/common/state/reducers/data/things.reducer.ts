import { Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as thingsActions from '../../actions/data/things.actions';
import { ThingType } from '../../../types/thing.type';

export interface State {
  things: ThingType[];
}
const initialState: State = {
  things: []
};

/**
 * THINGS_LOAD_SUCCESS: Set things as payload
 * THING_UPDATE: Update a thing in things
 */
export function ThingsReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case thingsActions.ThingsActionTypes.THINGS_LOAD_SUCCESS: {
      let datas = action.payload;
      for(let i = 0; i < datas.length; i++) {
        if (datas[i].type === 'gender') {
          datas[i].template = false;
          datas[i].url = '/assets/img/constructor/'+datas[i].gender+'_01.png';
        }
        else if (datas[i].type === 'skin') {
          datas[i].template = false;
          datas[i].url = '/assets/img/constructor/'+datas[i].gender+'_0'+datas[i].counter+'.png';
        }
        else {
          datas[i].template = true;
          datas[i].url = '/assets/gear-templates/'+datas[i].gender+'/'+datas[i].name+'.html'
        }
      }
      return {things: datas};
    }

    case thingsActions.ThingsActionTypes.THINGS_LOAD_FAIL: {
      return state;
    }

    case thingsActions.ThingsActionTypes.THING_UPDATE: {
      let thingIndex = -1;
      const thing = action.payload;
      const things = state.things;
      for (let i = 0; i < things.length; i++) {
        if (things[i].uuid === thing.uuid) {
          thingIndex = i;
          break;
        }
      }
      if (thingIndex !== -1) {
        return {
          things: [
            ...things.slice(0, thingIndex),
            thing,
            ...things.slice(thingIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
}

export function getThings(state$: Observable<State>) {
  return state$.select(s => s.things);
}
