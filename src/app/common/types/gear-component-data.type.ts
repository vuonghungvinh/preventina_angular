import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { ThingType } from './thing.type';

export interface GearComponentDataType {
  colours?: string[];
  coloursObservable?: Observable<[string]>;
  select?: EventEmitter<ThingType>;
}
