import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { ApplicationState } from "../../";
import * as thingActions from "../../actions/data/things.actions";
import { FirebaseService } from "../../../services";
import { Observable } from "rxjs";

@Injectable()
export class ThingEffect {
    constructor(
        private store: Store<ApplicationState>,
        private actions: Actions,
        private thingservice: FirebaseService
    ){}

    @Effect() loadThings$: Observable<Action> = this.actions
        .ofType(thingActions.ThingsActionTypes.THINGS_LOAD)
        .switchMap(payload=>{
            return this.thingservice.getThings().map(things => new thingActions.ThingsLoadSuccessAction(things)).
                catch(error => Observable.of(new thingActions.ThingsLoadFailAction()))
        });
}