// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {Routes} from '@angular/router';
import {AppState} from './app.service';

import {RouterActive} from './shared/directives/router-active/router-active.directive';

import {Home} from './home';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Import Todo component
import {Todo} from './todo/todo.component';
import {Item} from './items/item.component';
import {Ruku} from './ruku/ruku.component';
import {Chuku} from './chuku/chuku.component';
import {Summary} from './summary/summary.component';
// Import Recipes component
import {Chat} from './chat/chat.component';
import {SignUpComponent} from './auth/signup/signup.component';
import {SignInComponent} from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import {Profile} from './profile/profile.component';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ AuthService  ],
  directives: [ Todo,
                NgFor,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: require('./layout.html')
})
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/todo', component: Todo, name: 'Todo' },
  { path: '/item', component: Item, name: 'Item' },
  { path: '/ruku', component: Ruku, name: 'Ruku' },
  { path: '/chuku', component: Chuku, name: 'Chuku' },
  { path: '/summary', component: Summary, name: 'Summary' },
  { path: '/chat', component: Chat, name: 'Chat' },
  { path: '/signup', component: SignUpComponent, name: 'Signup' },
  { path: '/signin', component: SignInComponent, name: 'Signin' },
  { path: '/profile', component: Profile, name: 'Profile' },
  // Async load a component using Webpack's require with
  // es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/**', name: 'default', redirectTo: ['Index'] }
])

export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Product Managers';
  url = 'https://twitter.com/datatype_void';
  public check_button: any = false;
  public isAuthenticate: any;
  public authService: any;
  // Pass in our application `state`
  // Alternative to using `redux`
  constructor(public appState: AppState,authService: AuthService) {
    this.authService = authService;
    this.isAuthenticate = authService.isAuthenticate();
  }

  // Fire off upon initialization
  ngOnInit() {

    console.log('Initial App State', this.appState.state);
  }
}

/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
