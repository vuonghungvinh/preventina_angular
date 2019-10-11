import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy, AfterViewInit, ViewChild
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';

import { ThingType, GearComponentService } from '../../common';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'gear',
  templateUrl: './gear.component.html',
  styleUrls: [ './gear.component.scss' ]
})
export class GearComponent implements OnInit, OnDestroy {
  /**
   * @Input
   */
  @Input() gear: ThingType;
  /**
   * @Input
   */
  @Input() canHaveComment: boolean;
  /**
   * @Input
   */
  @Input() selected: boolean;
  /**
   * @Input
   */
  @Input() firstColour: string;
  /**
   * @Input
   */
  @Input() secondColour: string;
  /**
   * @Input
   */
  @Input() thirdColour: string;
  /**
   * click for adding to poster
   * @Output
   */
  @Output() select: EventEmitter<any> = new EventEmitter(null);
  /**
   * @Output
   */
  @Output() changeColour: EventEmitter<any> = new EventEmitter(null);

  mergedColoursObservable: Observable<any>;
  subscriptions: Subscription[] = [];
  gearCommentForm: FormGroup;

  public firstColourControl: FormControl;
  public secondColourControl: FormControl;
  public thirdColourControl: FormControl;
  private componentStateColours: string[] = [];

  @ViewChild('gearCommentModal') private gearCommentModal: ModalDirective;

  constructor(
    private gearComponentService: GearComponentService
  ) {}

  ngOnInit() {
    const observablesForMerging = [];

    if (this.firstColour) {
      this.componentStateColours[0] = this.firstColour;
    }

    if (this.secondColour) {
      this.componentStateColours[1] = this.secondColour;
    }

    if (this.thirdColour) {
      this.componentStateColours[1] = this.thirdColour;
    }

    if (this.gear.firstColour) {
      this.firstColourControl = new FormControl(this.firstColour || this.gear.firstColour);

      observablesForMerging.push(this.firstColourControl.valueChanges);
    }

    if (this.gear.secondColour) {
      this.secondColourControl = new FormControl(this.secondColour || this.gear.secondColour);

      observablesForMerging.push(this.secondColourControl.valueChanges);
    }

    if (this.gear.thirdColour) {
      this.thirdColourControl = new FormControl(this.thirdColour || this.gear.thirdColour);

      observablesForMerging.push(this.thirdColourControl.valueChanges);
    }

    if (observablesForMerging[0]) {
      this.mergedColoursObservable = Observable.merge(...observablesForMerging)
        .map(() => [
          this.firstColourControl.value,
          this.secondColourControl ? this.secondColourControl.value : undefined,
          this.thirdColourControl ? this.thirdColourControl.value : undefined
        ]);

      this.mergedColoursObservable
        .debounce(() => Observable.timer(300))
        .subscribe((colours) => {
          this.changeColour.emit(colours);
          this.componentStateColours = colours;
        });
    }

    this.gearCommentForm = new FormGroup({
      'comment': new FormControl('')
    });

    this.subscriptions.push(
      this.gearComponentService.openGearCommentModalSubject.subscribe(() => {
        this.openGearCommentModal();
      })
    );
  }

  /**
   * Unsubscribe all
   */
  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }

  onSelect(gear) {
    this.select.emit(_.assign({}, gear, {
      firstColour: this.componentStateColours[0] || this.firstColour || this.gear.firstColour,
      secondColour: this.componentStateColours[1] || this.secondColour || this.gear.secondColour,
      thirdColour: this.componentStateColours[2] || this.thirdColour || this.gear.thirdColour
    }));
  }


  private openGearCommentModal() {
    this.gearCommentModal.show();
  }

  closeGearCommentModal() {
    this.gearCommentModal.hide();
    const test = this.gearCommentForm.value.comment;
    this.gear.comment = test;
    //this.gearComponentService.closeGearCommentModalSubject.next(this.gearCommentForm.value.comment);
  }
}
