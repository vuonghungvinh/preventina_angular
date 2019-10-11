import { Component, OnInit, Input } from '@angular/core';
import { PosterType } from '../../types/poster.type';
import { FirebaseService } from '../../services/firebase.service';
import * as PosterActions from '../../state/actions/data/poster.actions';
import { Store } from "@ngrx/store";
import { ApplicationState } from '../../';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() poster: PosterType;

  constructor(
    private firebaseService: FirebaseService,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
  }

  save() {
    this.store.dispatch(new PosterActions.PosterCreateAction(this.poster));
  }

}
