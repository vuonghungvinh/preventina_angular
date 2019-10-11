import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { FirebaseService } from '../../common/services/firebase.service';
import { TabType, PosterType } from '../../common/types';
import { ApplicationState } from '../../common';
import { Store } from "@ngrx/store";
import * as thingsAction from '../../common/state/actions/data/things.actions';

@Component({
  selector: 'gears-tabs',
  templateUrl: './gears-tabs.component.html',
  styleUrls: [ './gears-tabs.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class GearsTabsComponent {
  /**
   * @Input
   */
  @Input() tabs: [TabType];
  /**
   * @Input
   */
  @Input() poster: PosterType;
  /**
   * @Output
   */
  @Output() selectThing: EventEmitter<any> = new EventEmitter(false);
  /**
   * @Output
   */
  @Output() deselectThing: EventEmitter<any> = new EventEmitter(false);

  selectedIndex = 0;

  public things = {};

  constructor(
    private dragulaService: DragulaService,
    private firebaseService: FirebaseService,
    private store: Store<ApplicationState>
  ) {
    dragulaService.dropModel.subscribe(() => {
      firebaseService.reorder(this.tabs);
    });
    // this.store.select("things").subscribe(data=>{
    //   console.log(data);
    // });
    this.store.dispatch(new thingsAction.ThingsLoadAction());
    this.store.select("things").subscribe(things=>{
      this.firebaseService.groupedThings$.subscribe(data=>{
        this.things = data;
      })
    });
  }

  /**
   * @param index The index of selected tab
   * @returns false if selected tab is disabled
   */
  selectTab(index) {
    const selectedTab = this.tabs[index];

    if (!selectedTab.disabled) {
      this.selectedIndex = index;
    } else {
      return false;
    }
  }
}
