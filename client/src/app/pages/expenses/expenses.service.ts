import { Injectable }
from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  apiUrl =
    'http://localhost:5000/api/expenses';

  constructor(
    private http: HttpClient
  ) {}

  addExpense(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );
  }

  getExpenses() {

    return this.http.get(
      this.apiUrl
    );
  }
}