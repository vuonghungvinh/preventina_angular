import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as _ from 'lodash';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Check if token exist. If found token, redirect to root.
   * @return whether token exists.
   */
  canActivate(): boolean {
    const thereIsToken = !_.isEmpty(this.authService.getAuthToken());

    if (thereIsToken) {
      this.router.navigate(['']);

      return false;
    }

    return true;
  }
}
