import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, ElementRef } from '@angular/core';

import {ThingType, DimensionType, GenderType, SvgType} from '../../types';
import { ThingsColouringService } from '../../services/things-colouring.service';
import * as _ from 'lodash';

@Component({
  selector: 'static-gear',
  templateUrl: './static-gear.component.html'
})

export class StaticGearComponent implements AfterViewInit, OnChanges {
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
      //this.setDimensions(this.dimensions);
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
}
