import { Pipe } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetter {
  /**
   * @return First letter of s
   */
  transform(s: string) {
    return s.charAt(0);
  }
}
