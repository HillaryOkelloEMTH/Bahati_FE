import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-collector-collections-per-date',
  templateUrl: './collector-collections-per-date.component.html',
  styleUrls: ['./collector-collections-per-date.component.sass'],
})
export class CollectorCollectionsPerDateComponent
  extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;
  public barChartOptions1: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: any = ['Price Chart', 'Quantity Chart'];
  monthsArray: any = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'Novembar', value: 11 },
    { name: 'December', value: 12 },
  ];
  isLoading: boolean;
  chartParametersForm: FormGroup;
  quantityChartSelected: boolean = false;
  priceChartSelected: boolean = true;

  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];

  constructor(private analyticsService: AnalyticsService, private datePipe: DatePipe, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.chartParametersForm = this.createChartParamtersForm();

    console.log('Current Month ', this.currentMonth);
    this.getCollectionsAmountAnalysisPerDate();
  }

  createChartParamtersForm() {
    return this.fb.group({
      chart: ["Price Chart"],
      date: [new Date()],
    });
  }

  onSelectChart(event: any){
    if(event.value == "Quantity Chart"){
      this.quantityChartSelected = true;
      this.priceChartSelected = false;

      this.getCollectionsQuantityAnalysisPerDate();

    }else if(event.value == "Price Chart"){
      this.quantityChartSelected = false;
      this.priceChartSelected =  true;

      this.getCollectionsAmountAnalysisPerDate()
    }else {
      this.quantityChartSelected = false;
      this.priceChartSelected =  false;

    }
  }

  getCollectionsAmountAnalysisPerDate() {
    this.isLoading = true;

    let collectors: any[] = [];
    let amounts: any[] = [];
    let params;

    params = new HttpParams()
      .set('date', this.datePipe.transform(this.chartParametersForm.value.date, "yyyy-MM-dd"))

    this.analyticsService
      .getCollectionsAnalysisPerDate(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log('Response', res);

          if(res.entity.length > 0){
            res.entity.forEach((item) => {
              collectors.push(item.collector);
  
              amounts.push(item.amount);
            });
          }else {
            collectors = [];

            amounts = [];
          }

          this.barChartOptions = {
            series: [
              {
                name: 'Price (KES)',
                data: amounts,
              },
            ],
            chart: {
              type: 'bar',
              height: 350,
              foreColor: '#9aa0ac',
              stacked: false,
              toolbar: {
                show: false,
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0,
                  },
                },
              },
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
              },
            },
            // dataLabels: {
            //   enabled: false,
            // },
            xaxis: {
              type: 'category',
              categories: collectors,
            },
            legend: {
              show: false,
            },
            fill: {
              opacity: 1,
              colors: ['#177147', '#397157', '#2D7152', '#22714D'],
            },
            tooltip: {
              theme: 'dark',
              marker: {
                show: true,
              },
              x: {
                show: true,
              },
            },
          };

          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCollectionsQuantityAnalysisPerDate() {
    this.isLoading = true;

    let collectors: any[] = [];
    let quantities: any[] = [];
    let params;

    params = new HttpParams()
      .set('date', this.datePipe.transform(this.chartParametersForm.value.date, "yyyy-MM-dd"));

    this.analyticsService
      .getCollectionsAnalysisPerDate(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log('Response', res);

          res.entity.forEach((item) => {
            collectors.push(item.collector);

            quantities.push(item.quantity);
          });

          this.barChartOptions1 = {
            series: [
              {
                name: 'Quantity',
                data: quantities,
              },
            ],
            chart: {
              type: 'bar',
              height: 350,
              foreColor: '#9aa0ac',
              stacked: false,
              toolbar: {
                show: false,
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0,
                  },
                },
              },
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
              },
            },
            // dataLabels: {
            //   enabled: false,
            // },
            xaxis: {
              type: 'category',
              categories: collectors,
            },
            legend: {
              show: false,
            },
            fill: {
              opacity: 1,
              colors: ['#177147', '#397157', '#2D7152', '#22714D'],
            },
            tooltip: {
              theme: 'dark',
              marker: {
                show: true,
              },
              x: {
                show: true,
              },
            },
          };

          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
