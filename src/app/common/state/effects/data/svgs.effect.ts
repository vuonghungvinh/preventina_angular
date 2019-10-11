import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";
import { ApplicationState } from "../../";
import * as svgActions from "../../actions/data/svgs.actions";
import { FirebaseService } from "../../../services";
import { Observable } from "rxjs";
import { SvgParamType } from '../../../types';

@Injectable()
export class SvgEffect {
    constructor(
        private store: Store<ApplicationState>,
        private actions: Actions,
        private svgservice: FirebaseService
    ){}


    @Effect() loadSvgs$: Observable<Action> = this.actions
        .ofType(svgActions.SvgsActionTypes.SVGS_LOAD_ALL)
        .switchMap(payload=>{
            return this.svgservice.getSvgs().map(svgs => new svgActions.SvgsLoadAllSuccessAction(svgs)).
                catch(error => Observable.of(new svgActions.SvgsLoadAllFailAction()))
        });


    @Effect() loadSvg$: Observable<Action> = this.actions
        .ofType(svgActions.SvgsActionTypes.SVGS_LOAD)
        .switchMap(payload=>{
            return this.svgservice.loadSvg(payload).map(svgs => new svgActions.SvgsLoadSuccessAction(svgs)).
                catch(error => Observable.of(new svgActions.SvgsLoadFailAction()))
        });
        
}