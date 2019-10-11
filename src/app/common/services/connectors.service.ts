import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { FirebaseService } from './firebase.service';

@Injectable()
export class ConnectorsService {
  private jsPlumbInstance: any = {};
  private connections: any = {};

  static getSourceElement(type: string): [any] {
    return jsPlumb.getSelector(`[data-gear-type='${type}'] svg`)[0];
  }

  static getTargetElement(type: string): [any] {
    return jsPlumb.getSelector('.preview-box-item-text.' + type);
  }

  static svgSizeCalculators(el) {
    return [el.getBoundingClientRect().width, el.getBoundingClientRect().height];
  }

  static svgOffsetCalculators(el, parentNodeOffset, containerElement) {
    return {
      left: parentNodeOffset.left + el.getBoundingClientRect().left -
      containerElement.getBoundingClientRect().left - parentNodeOffset.left,
      top: parentNodeOffset.top + el.getBoundingClientRect().top -
      containerElement.getBoundingClientRect().top - parentNodeOffset.top
    };
  }

  constructor(private firebaseService: FirebaseService) {}

  /**
   * Connect source and target element that are of type.
   */
  connectThing(type: string) {
    this.detachConnection(type);

    setTimeout(() => {
      const sourceElement = ConnectorsService.getSourceElement(type);
      const targetElement = ConnectorsService.getTargetElement(type);

      if (!_.isEmpty(targetElement) && sourceElement) {
        this.connections[type] = this.connectElements(sourceElement, targetElement);
      }
    }, 30);
  }

  /**
   * Call detachConnection(type)
   */
  deselectThing(type: string) {
    this.detachConnection(type);
  }

  init() {
    const containerElementId = 'preview';
    const containerElement = $(`#${containerElementId}`)[0];
    const originalOffset = jsPlumbInstance.prototype.getOffset;
    const originalSize = jsPlumbInstance.prototype.getSize;

    jsPlumbInstance.prototype.getOffset = function(el) {
      const tn = el.tagName.toUpperCase();

      if (tn === 'SVG' || tn === 'USE' || tn === 'G') {
        return ConnectorsService.svgOffsetCalculators(el, jsPlumbInstance.prototype.getOffset.apply(this, [el.parentNode]), containerElement);
      } else {
        return originalOffset.apply(this, [el]);
      }
    };

    jsPlumbInstance.prototype.getSize = function(el) {
      const tn = el.tagName.toUpperCase();

      if (tn === 'SVG' || tn === 'USE' || tn === 'G') {
        return ConnectorsService.svgSizeCalculators(el);
      } else {
        return originalSize.apply(this, [el]);
      }
    };

    jsPlumb.ready(() => {
      setTimeout(() => {
        _.merge(this.jsPlumbInstance, jsPlumb.getInstance({
          connector: 'StateMachine',
          paintStyle: {
            lineWidth: 1,
            strokeStyle: '#000',
            outlineColor: 'black',
            outlineWidth: 1
          },
          Endpoint: [ 'Dot', { radius: 1 } ],
          EndpointStyle: { fillStyle: '#000' },
          Container: containerElementId
        }));

        const partsOfBody = jsPlumb.getSelector('[data-gear-type]');

        this.jsPlumbInstance.batch(() => {
          _.each(partsOfBody, item => {
            const type = item.getAttribute('data-gear-type');
            const sourceElement = ConnectorsService.getSourceElement(type);
            const targetElement = ConnectorsService.getTargetElement(type);

            if (!_.isEmpty(targetElement) && sourceElement) {
              this.connections[type] = this.connectElements(sourceElement, targetElement);
            }
          });
        });

        jsPlumb.fire('jsPlumbDemoLoaded', this.jsPlumbInstance);
      }, 1000);
    });

    $(window).resize(() => {
      this.jsPlumbInstance.repaintEverything();
    });
  }

  /**
   * Remove the connection of type
   */
  private detachConnection(type: string) {
    if (!_.isEmpty(this.connections[type])) {
      this.jsPlumbInstance.detach(this.connections[type]);
      delete this.connections[type];
    }
  }

  /**
   * 1. Make target draggable
   * 2. Connect source and target
   */
  private connectElements(source, target) {
    // make target draggable
    this.jsPlumbInstance.draggable(target, {
      stop: (event) => {
        this.firebaseService.changeThingCommentPosition({
          thingType: event.el.getAttribute('data-text-thing-type'),
          position: event.pos
        });
      }
    });

    return this.jsPlumbInstance.connect({
      source,
      target,
      anchors: ['Center', 'Center'],
      connector: [ 'Bezier', { curviness: 100 }],
    });
  }

}
