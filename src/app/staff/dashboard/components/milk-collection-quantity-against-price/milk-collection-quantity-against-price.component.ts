import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
  ApexResponsive,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { takeUntil } from 'rxjs';
import { AnalyticsService } from 'src/app/data/services/analytics.service';
import { UserService } from 'src/app/data/services/user.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-milk-collection-quantity-against-price',
  templateUrl: './milk-collection-quantity-against-price.component.html',
  styleUrls: ['./milk-collection-quantity-against-price.component.sass'],
})
export class MilkCollectionQuantityAgainstPriceComponent extends BaseComponent implements OnInit {
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: any = [2024, 2025, 2026, 2027, 2028];
  monthsArray: any = [
    { name: "January", value: 1 },
    { name: "February", value : 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "Novembar", value: 11  },
    { name: "December", value: 12 },
  ];
  
  isLoading: boolean;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  chartParametersForm: FormGroup;

  constructor(
    private analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();
    
    this.getCollectorCollectionSPerMonth();
  }

  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
      collectorId: [""]
    });
  }


  onSelectYear(event: any){
    this.getCollectorCollectionSPerMonth()
  }

  onSelectMonth(event: any){
    this.getCollectorCollectionSPerMonth()
  }

  getCollectorCollectionSPerMonth(){
    this.isLoading = true;

    let quanties: any[] = [];
    let collectors: any[] = [];
    let amounts: any[] = []
    let params;

    params = new HttpParams()
    .set('year', this.chartParametersForm.value.year)
    .set("month", this.chartParametersForm.value.month)
   
    this.analyticsService.getCollectorCollectionSPerMonth(params).pipe(takeUntil(this.subject)).subscribe(res => {
      console.log("Response", res);

      if(res.entity.length > 0){
        res.entity.forEach(item => {
          collectors.push(item.collector);
  
          quanties.push(item.quantity);
  
          amounts.push(item.amount);
        })
  
      }else {
        collectors = [];

        quanties = [];

        amounts = [];
      }

      this.lineChartOptions = {
        series: [
          {
            name: "Price",
            data: amounts,
          }
        ],
        chart: {
          height: 350,
          type: "line",
          foreColor: "#9aa0ac",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#177147", "#397157", "#2D7152", "#22714D"],
        stroke: {
          curve: "smooth",
        },
        grid: {
          row: {
            colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 3,
        },
        xaxis: {
          categories:  quanties,
          title: {
            text: "Quantity (litres)",
          },
        },
        yaxis: {
          // opposite: true,
          title: {
            text: "Price (KES)",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
        tooltip: {
          theme: "dark",
          marker: {
            show: true,
          },
          x: {
            show: true,
          },
        },
      };

      this.isLoading = false;
    }, err => {
      console.log(err)
    })
  }
}
