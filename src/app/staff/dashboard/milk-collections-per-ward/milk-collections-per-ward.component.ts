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
  selector: 'app-milk-collections-per-ward',
  templateUrl: './milk-collections-per-ward.component.html',
  styleUrls: ['./milk-collections-per-ward.component.sass']
})
export class MilkCollectionsPerWardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Milk Quantity (Ltrs)",
          data: [0,3100, 4200, 2800, 5100, 4200, 10900, 10000]
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
        curve: "smooth"
      },
      xaxis: {
        labels:{
          rotateAlways:true,
          trim:true,
        },
        type: "category",
        categories: [
          "",
          "Ward A",
          "Ward B",
          "Ward C",
          "Ward D",
          "Ward E",
          "Ward F",
          "Ward G",
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
