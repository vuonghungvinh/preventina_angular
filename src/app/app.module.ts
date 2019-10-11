import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DynamicComponentModule } from 'angular2-dynamic-component';
import { EffectsModule } from '@ngrx/effects';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { ROUTES } from './app.routes';
import { reducer } from './common/state/reducers';
import { AuthEffect, PosterEffect, PosterPageEffect, TabEffect, ThingEffect } from './common/state/effects';

import { AppComponent } from './app.component';
import { LoginContainerComponent } from './login';


import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import {
  ConstructorContainerComponent,
  PosterPreviewComponent,
  GearComponent,
  GearsTabsComponent,
  GearsListComponent
} from './constructor';

import {
  AccountContainerComponent,
  PostersListComponent,
  EditableTitleComponent
} from './account';

import {
  //services
  AuthService,
  UserService,
  NotificationService,
  PosterPageService,
  ThingsColouringService,
  GearComponentService,
  ConnectorsService,
  AuthInterceptor,

  FirebaseService,

  // guards
  LoginGuard,
  AuthorisedGuard,

  // endpoints
  UserEndpoint,
  PosterEndpoint,

  // components
  ExtendedInputComponent,
  PosterSvgBuilder,
  UserNavComponent,
  DynamicGearComponent,
  StaticGearComponent,

  // pipes
  FirstLetter,
  OrderBy
} from './common';
import {HeaderComponent} from './common/components/header/header.component';
import {NavComponent} from './common/components/nav/nav.component';

const APP_COMPONENTS = [
  AppComponent,
  LoginContainerComponent,
  ConstructorContainerComponent,
  GearComponent,
  GearsTabsComponent,
  GearsListComponent,
  AccountContainerComponent,
  PostersListComponent,
  EditableTitleComponent,

  // common components
  ExtendedInputComponent,
  PosterSvgBuilder,
  UserNavComponent,
  DynamicGearComponent,
  StaticGearComponent,

  // components
  PosterPreviewComponent,

  // pipes
  FirstLetter,
  OrderBy,

  //learn
  NavComponent,
  HeaderComponent
];

const httpInterceptorProviders: Type<IHttpInterceptor>[] = [
  AuthInterceptor
];

const APP_PROVIDERS = [
  AuthService,
  UserService,
  FirebaseService,
  NotificationService,
  FirebaseService,
  FirebaseService,
  PosterPageService,
  UserEndpoint,
  PosterEndpoint,
  ThingsColouringService,
  GearComponentService,
  ConnectorsService,
  httpInterceptorProviders,

  // guards
  LoginGuard,
  AuthorisedGuard
];

export const firebaseCredentials = {
  apiKey: "AIzaSyB0Gh1qJB8CO65U7fcBXwgHE8RxVJ8roUk",
  authDomain: "preventina-9573b.firebaseapp.com",
  databaseURL: "https://preventina-9573b.firebaseio.com",
  projectId: "preventina-9573b",
  storageBucket: "preventina-9573b.appspot.com",
  messagingSenderId: "590741124640"
}

@NgModule({
  declarations: APP_COMPONENTS,
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(reducer),
    EffectsModule.run(AuthEffect),
    EffectsModule.run(PosterEffect),
    EffectsModule.run(PosterPageEffect),
    EffectsModule.run(TabEffect),
    EffectsModule.run(ThingEffect),
    DragulaModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    DynamicComponentModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: AuthInterceptor, paths: ['**'],
      }],
    }),
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireDatabaseModule
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
