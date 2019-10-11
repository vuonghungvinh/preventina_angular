import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { PosterType } from '../../common';

@Component({
  selector: 'posters-list',
  templateUrl: './posters-list.html',
  styleUrls: [ './posters-list.scss' ]
})
export class PostersListComponent {
  /**
   * @Input
   */
  @Input() posters: PosterType[];
  /**
   * @Output
   */
  @Output() deletePoster = new EventEmitter(false);
  /**
   * @Output
   */
  @Output() addPoster = new EventEmitter(false);
  /**
   * @Output
   */
  @Output() updatePoster = new EventEmitter(false);

  /**
   * Called when the remove button is clicked.
   * Shows a confirm prompt before emit deletePoster event.
   * Passes { id: poster.id } as the parameter of deletePoster event.
   */
  askDeletePoster(poster: PosterType) {
    if (confirm('Are you sure you want remove the poster?')) {
      this.deletePoster.emit({ id: poster.id });
    }
  }
}
