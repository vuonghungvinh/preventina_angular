import { Component, Input } from '@angular/core';

import { UserType } from '../../types/user.type';

@Component({
  selector: 'user-nav',
  styleUrls: [ './user-nav.scss' ],
  templateUrl: './user-nav.html',
})
export class UserNavComponent {
  @Input() user: UserType;

  collapsed = true;

  collapse() {
    this.collapsed = !this.collapsed;
  }
}
