import { Component }
from '@angular/core';

import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';

import { CommonModule }
from '@angular/common';

import { AuthService }
from './services/auth';

@Component({

  selector: 'app-root',

  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {

  showNavbar = true;

  constructor(

    private authService:
    AuthService,

    private router:
    Router

  ) {
    this.router.routeReuseStrategy
  .shouldReuseRoute = () => false;

    this.router.events.subscribe(

      (event) => {

        if (
          event instanceof NavigationEnd
        ) {

          this.showNavbar = ![
            '/login',
            '/register'
          ].includes(
            event.urlAfterRedirects
          );
        }
      }
    );
  }

  logout() {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);
  }
}