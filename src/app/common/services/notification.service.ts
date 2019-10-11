import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Injectable()
export class NotificationService {
  private toastOptions = {
    showClose: true,
    timeout: 5000,
    theme: 'material'
  };

  constructor(private toastyService: ToastyService) {}

  success(msg) {
    const title = 'Success';

    this.toastyService.success(_.assign({}, this.toastOptions, { title, msg }));
  }

  error(msg) {
    const title = 'There is some error';

    this.toastyService.error(_.assign({}, this.toastOptions, { title, msg }));
  }

  warning(msg) {
    const title = 'There is some warning';

    this.toastyService.warning(_.assign({}, this.toastOptions, { title, msg }));
  }
}
