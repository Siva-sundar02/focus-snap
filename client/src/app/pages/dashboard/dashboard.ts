import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration
} from 'chart.js';

import { DashboardService }
from './dashboard.service';

import {
  Router,
  NavigationEnd
} from '@angular/router';

import { filter }
from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    BaseChartDirective,
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})
export class Dashboard
implements OnInit {

  dashboard: any;

  currentMonth = '';

  // PIE CHART

  pieChartType: 'pie' = 'pie';

  pieChartData:
  ChartConfiguration<'pie'>['data'] = {

    labels: [],

    datasets: [
      {
        data: []
      }
    ]
  };

  // BAR CHART

  barChartType: 'bar' = 'bar';

  barChartData:
  ChartConfiguration<'bar'>['data'] = {

    labels: [],

    datasets: [
      {
        label: 'Expenses',
        data: []
      }
    ]
  };

  constructor(
    private dashboardService:
    DashboardService,
    
    private router: Router
  ) {}

  ngOnInit(): void {

  this.currentMonth =
    new Date()
    .toISOString()
    .slice(0, 7);

  this.loadDashboard();

  this.router.events
    .pipe(
      filter(
        event =>
          event instanceof NavigationEnd
      )
    )
    .subscribe(() => {

      if (
        this.router.url === '/dashboard'
      ) {

        this.loadDashboard();
      }
    });
}

  loadDashboard() {

    this.dashboardService
      .getDashboard(this.currentMonth)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.dashboard = res;

          // PIE CHART

          this.pieChartData = {

            labels:
              res.categoryBreakdown.map(
                (c: any) => c.category
              ),

            datasets: [
              {
                data:
                  res.categoryBreakdown.map(
                    (c: any) =>
                      Number(c.total)
                  )
              }
            ]
          };

          // BAR CHART

          this.barChartData = {

            labels:
              res.categoryBreakdown.map(
                (c: any) => c.category
              ),

            datasets: [
              {
                label: 'Expenses',

                data:
                  res.categoryBreakdown.map(
                    (c: any) =>
                      Number(c.total)
                  )
              }
            ]
          };
        }
      });
  }
}