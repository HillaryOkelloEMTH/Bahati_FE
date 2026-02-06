import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-users-per-role',
  templateUrl: './users-per-role.component.html',
  styleUrls: ['./users-per-role.component.scss']
})
export class UsersPerRoleComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  subscription!: Subscription;
  chartLabels:string[] = [];
  chartData:number[] = [];
  data: any;

  constructor(private service: DashboardService) {
    this.subscription = this.service.getUsersPerRole().subscribe(res => {
      this.data = res;
      this.data.entity.names.forEach(element => {
        this.chartLabels.push(element)
      });

      this.data.entity.count.forEach(element => {
        this.chartData.push(element)
      });
    });

    this.chartOptions = {
      series: this.chartData,
      chart: {
        width: "100%",
        type: "pie"
      },
      labels: this.chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "90%"
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
