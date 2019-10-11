import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ApplicationState } from '../../';

import * as posterActions from '../../actions/data/poster.actions';
import * as thingsActions from '../../actions/data/things.actions';
import { FirebaseService, PosterPageService } from '../../../services';
import { PosterEndpoint } from '../../../endpoints/poster.endpoint';
import { ThingType } from '../../../types/thing.type'
import * as utilities from '../../../services/utilities.service';

@Injectable()
export class PosterEffect {
  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private posterEndpoint: PosterEndpoint,
    private firebaseService: FirebaseService,
    private posterPageService: PosterPageService
  ) {}

  @Effect() loadPostersInitially$: Observable<Action> = this.actions$
    .take(1)
    .switchMap(() => {
      return this.firebaseService.loadPosters()
        .switchMap((posters) => {
            let datas = [];
            for(let key in posters) {
              let obj = posters[key];
              obj['key'] = key;
              datas.push(obj);
            }
            posters = datas;
            return Observable.combineLatest(
              this.firebaseService.things$,
              this.firebaseService.tabs$
            )
              .map(([things, tabs]) => {
                const gearTypes = _.chain(tabs)
                  .filter({ format: 0 })
                  .map('gearType')
                  .value();

                _.each(posters, poster => {
                  _.each(gearTypes, (item: string) => {
                    if (poster[item]) {
                      const gear = _.find(things, { uuid: poster[item].uuid });

                      if (_.isEmpty(gear))
                        delete poster[item];

                      /*if (!_.isEmpty(gear)) {
                        poster[item].template = gear.template;
                      } else {
                        delete poster[item];
                      }*/
                    }
                  });
                });

                return new posterActions.PosterLoadAllSuccessAction(posters);
              });
          }
        );
    });

    @Effect() loadPoster$: Observable<Action> = this.actions$
      .ofType(posterActions.PosterActionTypes.POSTER_LOAD)
      .switchMap(({ payload }) => {
        return this.posterEndpoint.loadPoster(payload)
          .switchMap((poster) => {
              return Observable.combineLatest(
                this.firebaseService.things$,
                this.firebaseService.tabs$
              )
                .map(([things, tabs]) => {
  
                  const gearTypes = _.chain(tabs)
                    .filter({ format: 0 })
                    .map('gearType')
                    .filter((item: string) => poster[item])
                    .value();
  
                  /*
                  _.each(gearTypes, (item: string) => {
                    poster[item].template = _.find(things, { uuid: poster[item].uuid }).template;
                  });
                  */
  
                  return new posterActions.PosterLoadSuccessAction(poster);
                });
            }
          );
        });

  @Effect() loadPosters$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_LOAD_ALL)
    .switchMap(payload => {
        return this.firebaseService.loadPosters().map(data=> new posterActions.PosterLoadAllSuccessAction(data)).
                catch(error => Observable.of(new posterActions.PosterLoadAllFailAction()));
    });

  @Effect() savePoster$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_SAVE)
    .map(({ payload }) => payload.id ? new posterActions.PosterUpdateAction(payload) : new posterActions.PosterCreateAction(payload));

  @Effect() updatePoster$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_UPDATE)
    .switchMap(({ payload }) => {
      return this.posterEndpoint.savePoster(payload)
        .map(poster => new posterActions.PosterUpdateSuccessAction(poster))
        .catch(error => Observable.of(new posterActions.PosterUpdateFailAction()));
    });

  @Effect() createPoster$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_CREATE)
    .switchMap(({ payload }) => {
      return this.firebaseService.createPoster(payload).map(data=> new posterActions.PosterCreateSuccessAction(data)).
        catch(error=> Observable.of(new posterActions.PosterCreateFailAction()));
    });

  @Effect() deletePoster$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_DELETE)
    .switchMap(({ payload }) => {
      return this.posterEndpoint.deletePoster(payload)
        .map(() => new posterActions.PosterDeleteSuccessAction(payload))
        .catch(error => Observable.of(new posterActions.PosterDeleteFailAction()));
    });

  @Effect() changeThing$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_CHANGE_THING)
    .switchMap(({ payload: { posterId, thing } }) => {
      console.log('Changing things '+thing.uuid);
      return Observable.combineLatest(
        this.firebaseService.posters$,
        this.posterPageService.poster$
      )
        .take(1)
        .map(([posters, posterFromPosterPage]) => {
          let poster;

          if (posterId) {
            poster = _.find(posters, { id: posterId });
          } else {
            poster = posterFromPosterPage;
          }

          if(thing.type !== 'gender' && thing.type !== 'skin'){
            //Check if the gear is in the poster to decide on ADD/REMOVE
            if(!utilities.hasGearInPoster(poster, thing))
              thing.action = 'ADD';
            //Step one - remove object from array with same uuid as the new object
            utilities.removeGearFromPoster(poster, thing);

            //Step two - add newobject to the array IF selected NOT if deselected
            if(thing.action && thing.action === 'ADD')
              utilities.addGearToPoster(poster, thing);
             
            delete thing.action;
            
            //thing.action = undefined;
          }
          else{
            poster[thing.type] = _.assign({}, thing);
          }

          if (thing.type === 'gender') {
            let test = "gender";
            const allUsedThingsAlternatives = utilities.getAllUsedThingsAlternatives(poster);


            let newStuff = [];
            this.firebaseService.things$
              .subscribe(things => {
                _.each(allUsedThingsAlternatives, (uuid: string) => {
                  const relatedThing = _.find(things, (item: ThingType) => {
                    return item.uuid === uuid;
                  });

                  newStuff.push(_.assign({}, relatedThing, _.pick(utilities.getGearFromPoster(poster, thing), ['comment', 'firstColour', 'secondColour', 'thirdColour'])));
                });
                let currentSkin = poster.skin;
                let alternate = currentSkin.associateId;
                let newSkin = _.find(things, (o: ThingType) => {
                  return o.uuid === alternate;
                });
                poster.skin = newSkin;
              });
              //@TODO implement poster->parts->things here
              //poster.stuff = newStuff;
          }
          return new posterActions.PosterUpdateStoreAction(poster);
        });
    });

  @Effect({ dispatch: false }) test$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_CHANGE_THING)
    .do(() => console.log('effects'));

  @Effect() changeThingCommentPosition$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_CHANGE_THING_COMMENT_POSITION)
    .switchMap(({ payload: { thingType, position: [left, top] } }) => {
      return this.posterPageService.poster$
        .take(1)
        .map((poster) => {
          const changedPoster = _.assign({}, poster);

          changedPoster[thingType] = _.assign({}, poster[thingType]);
          changedPoster[thingType].commentPosition = { top, left };

          this.store.dispatch(new thingsActions.ThingUpdateAction(changedPoster[thingType]));
          return new posterActions.PosterUpdateStoreAction(changedPoster);
        });
    });
}
