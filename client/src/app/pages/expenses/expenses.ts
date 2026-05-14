import { Component }
from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import { ExpenseService }
from './expenses.service';

@Component({

  selector: 'app-expenses',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './expenses.html',

  styleUrls: ['./expenses.css']
})
export class Expenses {

  expense = {

    amount: 0,

    category: '',

    note: '',

    date: '',

    recurring: false
  };

  categories = [
    'Food',
    'Travel',
    'Bills',
    'Shopping',
    'Health',
    'Entertainment'
  ];

  constructor(

    private expenseService:
    ExpenseService,

    private router: Router

  ) {}

  submit() {

    this.expenseService
      .addExpense(this.expense)
      .subscribe({

        next: () => {

          alert(
            'Expense Added'
          );

          // RESET FORM

          this.expense = {

            amount: 0,

            category: '',

            note: '',

            date: '',

            recurring: false
          };

          // NAVIGATE TO DASHBOARD

          this.router.navigate([
            '/dashboard'
          ]);
        },

        error: (err) => {

          console.error(err);

          alert(
            'Failed to add expense'
          );
        }
      });
  }
}