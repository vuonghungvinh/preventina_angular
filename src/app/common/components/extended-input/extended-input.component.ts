import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'extended-input',
  templateUrl: './extended-input.component.html'
})
export class ExtendedInputComponent implements OnChanges {
  /**
   * @Input
   */
  @Input() id = '';
  /**
   * @Input
   */
  @Input() labelText: string = null;
  /**
   * @Input
   */
  @Input() dirty: any;
  /**
   * @Input
   */
  @Input() inputErrors: any;
  /**
   * @Input
   */
  @Input() errorDefs: any;
  /**
   * @Input
   */
  @Input() helpText: string = null;
  /**
   * @Input
   */
  @Input() required = false;

  hadFocus = false;
  errorMessage = '';

  /**
   * Shows error message when is dirty and has error
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dirty) {
      const errors: any = this.inputErrors;

      this.errorMessage = '';

      if (errors) {
        _.keys(this.errorDefs).some(key => {
          if (errors[key]) {
            this.errorMessage = this.errorDefs[key];

            return true;
          }
        });
      }
    }
  }
}
