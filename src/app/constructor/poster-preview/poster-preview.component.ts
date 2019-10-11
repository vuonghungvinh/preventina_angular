import { Component, Input, ElementRef, ViewChild } from '@angular/core';

import { FirebaseService } from '../../common';
import { PosterType } from '../../common/types/poster.type';
import { assign } from 'lodash';

@Component({
  selector: 'poster-preview',
  templateUrl: './poster-preview.component.html',
  styleUrls: [ './poster-preview.component.scss' ]
})
export class PosterPreviewComponent {
  @Input() poster: PosterType;

  @ViewChild('nameInput') nameInput: ElementRef;

  isEditingName = false;
  name: string;

  constructor(
    private firebaseService: FirebaseService
  ) {}


  enterEditName(): void {
    this.isEditingName = true;
    this.name = this.poster.name || 'New poster';
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }

  exitEditName(): void {
    this.isEditingName = false;
    if (this.name !== this.poster.name) {
      this.firebaseService.updatePosterWithoutSaveInDB(assign({}, this.poster, {name: this.name}));
    }
  }
}
