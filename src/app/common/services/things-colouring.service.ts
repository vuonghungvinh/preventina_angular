import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ThingsColouringService {
  changeColourOfGradients(jqueryElRef, selector, colour) {
    _.each(jqueryElRef.find(selector), item => {
      const dataTarget = item.getAttribute('data-target');
      if (dataTarget) {
        item.setAttribute('stop-color', this.shadeColour(colour, dataTarget));
      } else {
        item.setAttribute('stop-color', colour);
      }
    });
  }

  /**
   * Get shade colour
   */
  private shadeColour(color, percent: number): string {
    const f = parseInt(color.slice(1), 16);
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = f >> 16;
    const G = f >> 8 & 0x00FF;
    const B = f & 0x0000FF;

    let R_test = Math.round((t - R) * p) + R;
    let G_test = Math.round((t - G) * p) + G;
    let B_test = Math.round((t - B) * p) + B;

    let test = "#" + this.componentToHex(Math.round((t - R) * p) + R) + this.componentToHex(Math.round((t - G) * p) + G) + this.componentToHex(Math.round((t - B) * p) + B);
    console.log('From color '+color);
    console.log('by percent '+percent);
    console.log('Results in '+test);
    return "#" + this.componentToHex(Math.round((t - R) * p) + R) + this.componentToHex(Math.round((t - G) * p) + G) + this.componentToHex(Math.round((t - B) * p) + B);

    //return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  private componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
}
