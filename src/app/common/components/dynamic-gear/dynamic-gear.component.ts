import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, ElementRef } from '@angular/core';

import {ThingType, DimensionType, GenderType, SvgType} from '../../types';
import { ThingsColouringService } from '../../services/things-colouring.service';
import * as _ from 'lodash';

@Component({
  selector: 'dynamic-gear',
  templateUrl: './dynamic-gear.component.html'
})

export class DynamicGearComponent implements AfterViewInit, OnChanges {
  /**
   * @Input
   */
  @Input() gear: ThingType;
  /**
   * @Input
   */
  @Input() colours: string[];
  /**
   * @Input
   */
  @Input() coloursObservable: any;
  /**
   * @Input
   */
  @Input() dimensions: DimensionType[];
  /**
   * @Output
   */
  @Output() select: EventEmitter<ThingType> = new EventEmitter(false);

  /**
   * jQuery object of the component element
   */
  private jqueryElRef: any;

  constructor(
    private elementRef: ElementRef,
    private thingsColouringService: ThingsColouringService
  ) {}

  /**
   * Sets jqueryElRef, subscribes coloursObservable, calls changeColours and setDimensions
   */
  ngAfterViewInit() {
    this.jqueryElRef = $(this.elementRef.nativeElement);

    if (this.coloursObservable) {
      this.coloursObservable.subscribe((colours: string[]) => {
        this.changeColours(colours);
      });
    }

    setTimeout(() => {
      this.changeColours(this.colours);
      this.setDimensions(this.dimensions);
    });
  }

  /**
   * Calls changeColours and setDimensions if neccessary
   */
  ngOnChanges(changes) {
    if (this.jqueryElRef && ((changes.colours && changes.colours.currentValue) || (changes.gear && changes.gear.currentValue))) {
      setTimeout(() => {
        this.changeColours(changes.colours && changes.colours.currentValue || this.colours);
      });
    }
    if (this.jqueryElRef && ((changes.dimensions && changes.dimensions.currentValue) || (changes.gear && changes.gear.currentValue))) {
      setTimeout(() => {
        this.setDimensions(changes.dimensions && changes.dimensions.currentValue || this.dimensions);
      });
    }
  }

  /**
   * Calls thingsColouringService.changeColourOfGradients
   */
  private changeColours([firstColour, secondColour, thirdColour]: string[]) {
    if (firstColour) {
      this.thingsColouringService.changeColourOfGradients(this.jqueryElRef, '.color1 stop', firstColour);
    }

    if (secondColour) {
      this.thingsColouringService.changeColourOfGradients(this.jqueryElRef, '.color2 stop', secondColour);
    }

    if (thirdColour) {
      this.thingsColouringService.changeColourOfGradients(this.jqueryElRef, '.color3 stop', thirdColour);
    }
  }

  /**
   * Sets dimensions of the gear
   */
  private setDimensions(dimensions: DimensionType[]) {
    if (dimensions && dimensions[0]) {
      console.log(dimensions[0]);
      console.log(this.jqueryElRef);
      _.each(this.jqueryElRef.find('svg'), item => {
        const dataTarget = item.getAttribute('data-target');
        item.setAttribute('viewBox', '0 0 ' + dimensions[0].width + ' ' + dimensions[0].width);
        item.setAttribute('width', dimensions[0].scale + 'px');
        item.setAttribute('height', dimensions[0].scale + 'px');
        item.setAttribute('style', 'top:' + dimensions[0].y + 'px;left:' + dimensions[0].x + 'px;z-index:' + dimensions[0].z);
      });
    }
  }
}
