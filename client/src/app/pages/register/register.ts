import { Component }
from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
from '../../services/auth';

@Component({

  selector: 'app-register',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './register.html',

  styleUrl: './register.css'
})
export class Register {

  formData = {

    name: '',

    email: '',

    password: ''
  };

  error = '';

  constructor(

    private authService:
    AuthService,

    private router:
    Router

  ) {}

  register() {

    this.authService
      .register(this.formData)
      .subscribe({

        next: () => {

          alert(
            'Registration Successful'
          );

          this.router.navigate([
            '/login'
          ]);
        },

        error: (err) => {

          this.error =
            err.error?.error ||
            'Registration Failed';
        }
      });
  }
}