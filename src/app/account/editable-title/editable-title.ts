import {
  Component,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

import { Subject } from 'rxjs';

import { PosterType } from '../../common';

@Component({
  selector: 'editable-title',
  templateUrl: './editable-title.html',
  styleUrls: [ './editable-title.scss' ]
})
export class EditableTitleComponent {
  /**
   * @Input
   */
  @Input() poster: PosterType;

  /**
   * @Output Async EventEmitter, emit the new poster when the component is clicked
   */
  @Output() updatePoster = new EventEmitter(false);

  editingSubject = new Subject();

  constructor(public elementRef: ElementRef) {
    this.editingSubject
      .filter(value => value === false)
      .subscribe(() => this.updatePoster.emit(this.poster));
  }

  /**
   * Is called when the component is clicked.
   * editingSubject next a true value.
   * Focus on input.
   */
  dbClickHandler() {
    this.editingSubject.next(true);
    setTimeout(() => { $(this.elementRef.nativeElement).find('input').focus(); });
  }
}
