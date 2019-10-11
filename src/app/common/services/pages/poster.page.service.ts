import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { ApplicationState } from '../../state';
import { getPosterPagePosterSelector } from '../../state/reducers';
import * as posterPageActions from '../../state/actions/pages/poster.page.actions';
import { PosterType } from '../../types';

@Injectable()
export class PosterPageService {
  poster$: Observable<PosterType> = this.store.let(getPosterPagePosterSelector);
  closeNewPosterNameModalSubject: Subject<any> = new Subject();
  openNewPosterNameModalSubject: Subject<any> = new Subject();

  constructor(
    private store: Store<ApplicationState>,
  ) {}

  getPoster(id: number) {
    this.store.dispatch(new posterPageActions.PosterPageGetAction(id));
  }

  cleanPosterPage() {
    this.store.dispatch(new posterPageActions.PosterPageCleanAction());
  }

  savePoster() {
    this.store.dispatch(new posterPageActions.PosterPageSavePosterAction());
  }
}
