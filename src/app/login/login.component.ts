import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginContainerComponent {
  public loginForm: FormGroup;

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'remember': new FormControl(false)
    });
  }

  onSubmit(): void {
    this.userService.login(this.loginForm.value);
  }
}
