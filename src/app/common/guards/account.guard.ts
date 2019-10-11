import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as _ from 'lodash';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorisedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Check if is authorized by checking if token exists.
   * Redirect to /login if not logged in.
   * @return false if token not found. true if token is found
   */
  canActivate(): boolean {
    const thereIsNoToken = _.isEmpty(this.authService.getAuthToken());

    if (thereIsNoToken) {
      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
