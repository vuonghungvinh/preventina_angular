import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { hasGearInPoster } from '../../common/services/utilities.service';

import {
  ThingType,
  PosterType
} from '../../common';

@Component({
  selector: 'gears-list',
  templateUrl: './gears-list.component.html',
  styleUrls: [ './gears-list.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class GearsListComponent {
  /**
   * @Input
   */
  @Input() selectedTab: any;
  /**
   * @Input
   */
  @Input() poster: PosterType;
  /**
   * @Input
   */
  @Input () groupedGears: any;
  /**
   * @Output
   */
  @Output() selectThingFunction: EventEmitter<any> = new EventEmitter(false);
  /**
   * @Output
   */
  @Output() deselectThingFunction: EventEmitter<any> = new EventEmitter(false);

  /**
   * Toggle gear
   */

  onSelectGear(gear: ThingType) {
    if (!_.isEmpty(gear)){ 
      if (hasGearInPoster(this.poster, gear) )
        this.deselectThingFunction.emit(gear);
      else 
        this.selectThingFunction.emit(gear);
    }
  }

  /**
   * Change gender
   */
  onSelectGender(gear: ThingType) {
    if (!_.isEmpty(gear)) {
      if (!(
        this.poster
        && this.poster[this.selectedTab.gearType]
        && this.poster[this.selectedTab.gearType].uuid === gear.uuid
      )) {
        this.selectThingFunction.emit(gear);
      }
    }
  }

  /**
   * Change gear color
   */
  onChangeColour(gear, [firstColour, secondColour, thirdColour]) {
    const modifiedGear = _.assign({}, gear, { firstColour, secondColour, thirdColour });

    this.selectThingFunction.emit(modifiedGear);
  }

  isGearSelected(gear: ThingType) {
    return this.poster && this.poster[this.selectedTab.gearType] && this.poster[this.selectedTab.gearType].uuid === gear.uuid;
  }

}
