import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TabType, ThingType, PosterType, SvgType, SvgParamType } from '../types';
import { ApplicationState } from '../state';
import { getTabsSelector, getThingsSelector, getPostersSelector, getPostersAreLoadedSelector } from '../state/reducers';
import * as tabsActions from '../state/actions/data/tabs.actions';
import * as posterActions from '../state/actions/data/poster.actions';
import * as svgActions from '../state/actions/data/svgs.actions';
import { groupBy, each } from 'lodash';
import * as _ from 'lodash';

import { AngularFireDatabase,
         AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  public tabs$: Observable<TabType[]> = this.store.let(getTabsSelector);

  constructor(
    private store: Store<ApplicationState>,
    private db: AngularFireDatabase
  ) {}

  /* SVGS */

  getSvgs(): Observable<SvgType[]>{
  	return this.db.list('/svgs').valueChanges();
	}

  loadSvg(params: any) {
    const gear = params.gear;
    const gender = params.gender;
    return this.db.object('/svgs/${gear}/${gender}').valueChanges();
    //return this.store.dispatch(new svgActions.SvgsLoadAction({"gender": gender, "gear": gear}));
  }


  /* TABS */

  getTabs(): Observable<any[]>{
    return this.db.list('/tabs').valueChanges();
  }

  reorder(tabs: TabType[]) {
    this.store.dispatch(new tabsActions.TabsReorderAction(tabs));
  }

  /* THINGS */

  public things$: Observable<ThingType[]> = this.store.let(getThingsSelector);
  
  groupedThings$: Observable<any> = this.things$.map(things => {
      const groupedGears = groupBy(things, 'type');
      
      each(groupedGears, (value, key) => {
        if (key !== 'gender') {
          groupedGears[key] = <any>groupBy(value, 'gender');
        }
      });

    return groupedGears;
  });

  getThings(): Observable<any[]> {
  	return this.db.list('/gears').valueChanges();
  }

  /* POSTERS */

  posters$: Observable<PosterType[]> = this.store.let(getPostersSelector);
  postersAreLoaded$: Observable<boolean> = this.store.let(getPostersAreLoadedSelector);


  /**
   * Load all posters
   */
  loadPosters() {
    //return this._http.get(API_FIREBASE_URL + "loadposters").map(response => response.json());
  	return this.db.list('/loadposters').valueChanges();
  }

  createPoster(data) {
  	const itemRef = this.db.object('posters');
		itemRef.set(data)
    .then((obj) => {})
		.catch(err => console.log(err, 'Something went WRONG!'));
    return itemRef.valueChanges();
    //return this._http.post(API_FIREBASE_URL + "createposter", data).map(response => response.json());
  }

  /**
   * Load a single poster by its ID
   */
  loadPoster(posterId: number) {
    this.store.dispatch(new posterActions.PosterLoadAction(posterId));
  }

  selectThing(posterId, thing: ThingType) {
    this.store.dispatch(new posterActions.PosterChangeThingsAction({ posterId, thing }));
  }

  deselectThing(posterId, thing: ThingType) {
    this.store.dispatch(new posterActions.PosterChangeThingsAction(_.assign({}, { posterId, thing})));
  }

  changeThingCommentPosition(payload: { thingType: string; position: [number]; }) {
    this.store.dispatch(new posterActions.PosterChangeThingCommentPositionAction(payload));
  }


  changeThingPosition(payload: { thingType: string; position: [number]; }) {
    this.store.dispatch(new posterActions.PosterChangeThingCommentPositionAction(payload));
  }

  updatePosterWithoutSaveInDB(poster: PosterType) {
    this.store.dispatch(new posterActions.PosterUpdateStoreAction(poster));
  }

  savePoster(poster: PosterType) {
    if (poster.id) {
      this.updatePoster(poster);
    } else {
      this.createPoster(poster);
    }
  }

  // createPoster(poster: PosterType) {
  //   this.store.dispatch(new posterActions.PosterCreateAction(poster));
  // }

  updatePoster(poster: PosterType) {
    this.store.dispatch(new posterActions.PosterUpdateAction(poster));
  }

  deletePoster(poster: PosterType) {
    this.store.dispatch(new posterActions.PosterDeleteAction(poster));
  }



}