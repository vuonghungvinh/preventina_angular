import { Component, Input, ViewEncapsulation } from '@angular/core';

import { PosterType, ThingType } from '../../types';
import { FirebaseService } from '../../services';

import { has } from 'lodash';
import * as utilities from '../../services/utilities.service';

@Component({
  selector: 'poster-builder',
  templateUrl: './poster-builder.html',
  styleUrls: [ './poster-builder.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class PosterSvgBuilder {
  /**
   * @Input
   */
  @Input() poster: PosterType;
  stuff: ThingType[];

  constructor(public firebaseService: FirebaseService) {}

  /**
   * @return whether show this tab in poster builder
   * If it is not gender, return true
   * otherwise return whether poster.skin is selected
   */
  showTab(tab): boolean {
    if (tab.gearType !== 'gender') {
      return true;
    }
    return !has(this.poster.skin, 'uuid'); // test if uuid exists to check if a skin is selected
  }
}
