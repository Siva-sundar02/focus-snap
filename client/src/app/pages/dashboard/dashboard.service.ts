import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl =
    'http://localhost:5000/api/dashboard/summary';

  constructor(
    private http: HttpClient
  ) {}

  getDashboard(month: string) {

    return this.http.get(
      `${this.apiUrl}?month=${month}`
    );
  }
}