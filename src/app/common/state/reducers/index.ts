import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * Advanced logging for @ngrx/store applications, ported from redux-logger
 */
import { storeLogger } from 'ngrx-store-logger';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
// data
import * as fromAuthReducer from './data/auth.reducer';
import * as fromTabsReducer from './data/tabs.reducer';
import * as fromPosterReducer from './data/poster.reducer';
import * as fromThingsReducer from './data/things.reducer';

// pages
import * as fromPosterPageReducer from './pages/poster.page.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface ApplicationState {
  auth: fromAuthReducer.State;
  tabs: fromTabsReducer.State;
  posters: fromPosterReducer.State;
  things: fromThingsReducer.State;
  posterPage: fromPosterPageReducer.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  auth: fromAuthReducer.AuthReducer,
  tabs: fromTabsReducer.TabsReducer,
  posters: fromPosterReducer.PostersReducer,
  things: fromThingsReducer.ThingsReducer,
  posterPage: fromPosterPageReducer.PosterPageReducer
};

const developmentReducer = compose(storeLogger(), combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Selectors
// Data
// Auth
export function getAuthState(state$: Observable<ApplicationState>) {
  return state$.select(state => state.auth);
}

export const getAuthTokenSelector = compose(fromAuthReducer.getToken, getAuthState);
export const getUserSelector = compose(fromAuthReducer.getUser, getAuthState);

// Tabs
export function getTabsState(state$: Observable<ApplicationState>) {
  return state$.select(state => state.tabs);
}

export const getTabsSelector = compose(fromTabsReducer.getTabs, getTabsState);
// Poster
export function getPostersState(state$: Observable<ApplicationState>) {
  return state$.select(state => state.posters);
}

export const getPostersSelector = compose(fromPosterReducer.getPosters, getPostersState);
export const getPostersAreLoadedSelector = compose(fromPosterReducer.getPostersAreLoaded, getPostersState);

// Things
export function getThingsState(state$: Observable<ApplicationState>) {
  return state$.select(state => state.things);
}

export const getThingsSelector = compose(fromThingsReducer.getThings, getThingsState);

// Pages
export function getPosterPageState(state$: Observable<ApplicationState>) {
  return state$.select(state => state.posterPage);
}

export const getPosterPagePosterSelector = compose(fromPosterPageReducer.getPoster, getPosterPageState);
