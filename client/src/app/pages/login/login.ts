import { Component }
from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import { AuthService }
from '../../services/auth';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';

  password = '';

  constructor(

    private authService:
    AuthService,

    private router:
    Router

  ) {}

  login() {

    const data = {

      email: this.email,

      password: this.password
    };

    this.authService
      .login(data)
      .subscribe({

        next: (response: any) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate([
            '/dashboard'
          ]);
        },

        error: (error) => {

          alert(
            error.error.message
          );
        }
      });
  }
}