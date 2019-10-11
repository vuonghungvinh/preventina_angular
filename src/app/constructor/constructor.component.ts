import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Store } from "@ngrx/store";
import * as TabsAction from "../common/state/actions/data/tabs.actions";

import {
  UserService,
  FirebaseService,
  PosterPageService,
  ThingType,
  ConnectorsService,
  ApplicationState
} from '../common';

@Component({
  selector: 'constructor',
  templateUrl: './constructor.component.html'
})
export class ConstructorContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('newPosterNameModal') private newPosterNameModal: ModalDirective;

  newPosterNameForm: FormGroup;
  subscriptions: Subscription[] = [];
  public tabs = [];

  constructor(
    public userService: UserService,
    public posterPageService: PosterPageService,
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private connectorsService: ConnectorsService,
    private store: Store<ApplicationState>
  ) {
    this.store.select('tabs').subscribe((data: any[])=>{
      this.tabs = data['tabs'];
    });
  }

  ngOnInit() {
    this.store.dispatch(new TabsAction.TabsLoadAction());
    this.posterPageService.getPoster(+this.activatedRoute.snapshot.params['id']);

    this.newPosterNameForm = new FormGroup({
      'name': new FormControl('', Validators.required)
    });

    this.subscriptions.push(
      this.posterPageService.openNewPosterNameModalSubject.subscribe(() => {
        this.openNewPosterNameModal();
      })
    );
  }

  save() {
    this.posterPageService.savePoster();
  }

  selectThing({ posterId, thing }: { posterId: number, thing: ThingType }) {
    if(posterId)
      console.log("The posterId = "+posterId);
    else
      console.log("There is no posterId");
    console.log(thing);
    this.firebaseService.selectThing(posterId, thing);
    this.connectorsService.connectThing(thing.type);
    //To be implemented
    //this.dndService.initDnd(thing.type);
  }

  deselectThing({ posterId, thing }: { posterId: number, thing: ThingType }) {
    this.firebaseService.deselectThing(posterId, thing);
    this.connectorsService.deselectThing(thing.type);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.connectorsService.init();
    }, 500);
  }

  ngOnDestroy() {
    this.posterPageService.cleanPosterPage();
    _.each(this.subscriptions, item => item.unsubscribe());
  }

  private openNewPosterNameModal() {
    this.newPosterNameModal.show();
  }

  closeNewPosterNameModal() {
    if (this.newPosterNameForm.valid) {
      this.newPosterNameModal.hide();

      this.posterPageService.closeNewPosterNameModalSubject.next(this.newPosterNameForm.value.name);

      this.newPosterNameForm.reset({
        name: ''
      });
    }
  }
}
