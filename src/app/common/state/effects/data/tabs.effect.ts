import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { ApplicationState } from '../../';
import * as tabActions from '../../actions/data/tabs.actions';
import { FirebaseService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable()
export class TabEffect {
    constructor(
        private store: Store<ApplicationState>,
        private actions$: Actions,
        private firebaseService: FirebaseService
    ){}

    /*@Effect() loadTabs$: Observable<Action> = this.actions$
        .ofType(tabActions.TabsActionTypes.TABS_LOAD)
        .switchMap(payload => {
                return this.firebaseService.get().map(tabs => new tabActions.TabsLoadSuccessAction(tabs)).
                    catch(error => Observable.of(new tabActions.TabsLoadFailAction()))
            }
        );*/

    @Effect() loadTabs$: Observable<Action> = this.actions$
        .ofType(tabActions.TabsActionTypes.TABS_LOAD)
        .switchMap(payload => {
                return this.firebaseService.getTabs().map(tabs => new tabActions.TabsLoadSuccessAction(tabs))
            }
        );

}