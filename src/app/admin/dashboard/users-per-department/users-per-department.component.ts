import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-users-per-department',
  templateUrl: './users-per-department.component.html',
  styleUrls: ['./users-per-department.component.scss']
})
export class UsersPerDepartmentComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  chartYaxis: number[] = [];
  chartXaxis: string[] = [];
  data: any;
  subscription!: Subscription;

  constructor(private service: DashboardService) {
    this.subscription = this.service.getUsersPerDepartment().subscribe(res => {
      this.data = res;
      this.chartXaxis[0]="";
      this.data.entity.department.forEach(element => {
        this.chartXaxis.push(element)
      });
      this.chartXaxis.push("");

      this.chartYaxis[0]=0;
      this.data.entity.totalUsers.forEach(element => {
        this.chartYaxis.push(element)
      });
      this.chartYaxis.push(0);
    })
    this.chartOptions = {
      series: [
        {
          name: "Users",
          data: this.chartYaxis
        },
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        lineCap: "round",
        colors: ["#ad382d", "#99918c", "#d89694", "#b2b1b1"],
      },
      yaxis: {
        show: true,
        title: {
          text: "Users",
        }
      },

      xaxis: {
        categories: this.chartXaxis,
        labels:{
          rotateAlways:true,
          trim:true,
        }
      },

    };
  }
}
