import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService, FirebaseService } from '../common';

@Component({
  selector: 'account',
  templateUrl: './account.html'
})
export class AccountContainerComponent {

  /**
   * Uses FirebaseService to load posters
   */
  constructor(
    public firebaseService: FirebaseService,
    public userService: UserService,
    private router: Router
  ) {
    firebaseService.loadPosters();
  }

  /**
   * Uses UserService to logout and navigate to root path.
   */
  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
