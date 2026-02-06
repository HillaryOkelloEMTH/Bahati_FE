import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-collections-per-collector',
  templateUrl: './collections-per-collector.component.html',
  styleUrls: ['./collections-per-collector.component.scss']
})
export class CollectionsPerCollectorComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  amountSeries: number[] = [];
  quantitySeries: number[] = [];
  months: string[] = [];

  // getAnalytics() {
  //   this.accountService.allActiveUsers()
  //     .subscribe(
  //       (res) => {
  //         this.users = res.userData;
  //         if (this.users.length > 0) {
  //           this.isLoading = false;
  //           this.dataSource = new MatTableDataSource<any>(this.users);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Amount(Ksh)",
          data: [0, 31, 40, 28, 51, 42, 109, 100, 0, 0, 0, 0, 0]
        },
        {
          name: "Milk Quantity (Ltrs)",
          data: [0, 11, 32, 45, 32, 34, 52, 41, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: [
          "",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngOnInit(): void {

  }
}
