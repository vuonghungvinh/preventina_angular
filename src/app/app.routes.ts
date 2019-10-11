import { LoginContainerComponent } from './login';
import { ConstructorContainerComponent } from './constructor';
import { AccountContainerComponent } from './account';
import { LoginGuard, AuthorisedGuard } from './common';

export const ROUTES =  [{
    path: 'login',
    component: LoginContainerComponent,
    canActivate: [LoginGuard]
  }, {
    path: 'constructor/:id',
    component: ConstructorContainerComponent,
    canActivate: [AuthorisedGuard]
  }, {
    path: 'constructor',
    component: ConstructorContainerComponent,
  }, {
    path: 'account',
    component: AccountContainerComponent,
    canActivate: [AuthorisedGuard]
  }, {
    path: '**',
    redirectTo: 'constructor'
  }];
