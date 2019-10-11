import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import * as posterPageActions from '../../actions/pages/poster.page.actions';
import * as posterActions from '../../actions/data/poster.actions';
import { FirebaseService, PosterPageService } from '../../../services';
import { getUserSelector } from '../../reducers';
import { ApplicationState } from '../../../state';
import { UserType } from '../../../types/user.type';
import { makeDefaultPoster } from '../../../services/utilities.service';

@Injectable()
export class PosterPageEffect {
  private user$: Observable<UserType> = this.store.let(getUserSelector);

  constructor(
    private actions$: Actions,
    private store: Store<ApplicationState>,
    private firebaseService: FirebaseService,
    private posterPageService: PosterPageService,
    private router: Router,
  ) {}

  @Effect() getPoster$: Observable<Action> = this.actions$
    .ofType(posterPageActions.PosterPageActionTypes.POSTER_PAGE_GET)
    .switchMap(({ payload }) => {
      return Observable.combineLatest(
        this.firebaseService.posters$,
        this.firebaseService.postersAreLoaded$.filter(data => data)
      )
        .take(1)
        .map(([posters]) => {
          const posterInStore = _.find(posters, { id: payload });
          const poster = !!posterInStore ? posterInStore : makeDefaultPoster();

          return new posterPageActions.PosterPageSetAction(poster);
        });
    });

  @Effect() savePoster$: Observable<Action> = this.actions$
    .ofType(posterPageActions.PosterPageActionTypes.POSTER_PAGE_SAVE_POSTER)
    .switchMap(() => {
      return this.posterPageService.poster$
        .take(1)
        .switchMap(poster => {
          return this.user$
            .take(1)
            .switchMap((user: UserType) => {
              if (!!user) {
                if (!poster.id) {
                  this.posterPageService.openNewPosterNameModalSubject.next();

                  return this.posterPageService.closeNewPosterNameModalSubject
                    .take(1)
                    .map(name => new posterActions.PosterSaveAction(_.assign({}, poster, { name })));
                } else {
                  return Observable.of(new posterActions.PosterSaveAction(poster));
                }
              } else {
                this.router.navigate(['/login']);

                // go to authorisation
                return Observable.of({ type: 'NULL' });
              }
            });
        });
    });

  @Effect({ dispatch: false }) createPosterSuccess$: Observable<Action> = this.actions$
    .ofType(posterActions.PosterActionTypes.POSTER_CREATE_SUCCESS)
    .do(({ payload }) => this.router.navigate(['/constructor', payload.id]));
}
