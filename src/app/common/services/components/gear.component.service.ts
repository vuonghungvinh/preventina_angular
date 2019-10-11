import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GearComponentService {
  // TODO: Seems closeGearCommentModalSubject is unused. Comment it out for now. Remove it if no bug is caused.
  // closeGearCommentModalSubject: Subject<any> = new Subject();
  openGearCommentModalSubject: Subject<any> = new Subject();
}
