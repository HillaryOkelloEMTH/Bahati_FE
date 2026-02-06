import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-milk-qauntity-per-location',
  templateUrl: './milk-qauntity-per-location.component.html',
  styleUrls: ['./milk-qauntity-per-location.component.sass'],
})
export class MilkQauntityPerLocationComponent
  extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  // chartDispType: any = ['Year-wise', 'Month-wise'];
  chartDispType: any = [new Date().getFullYear()];
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
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  form: FormGroup

  constructor(private analyticsService: AnalyticsService, private fb: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [this.currentYear, [Validators.required]],
      month: [this.currentMonth.value, [Validators.required]]
    })

    console.log('Current Month ', this.currentMonth);
    this.getQuantityPerLocation();

  }

  getQuantityPerLocation() {
    this.isLoading = true;

    let locations: any[] = [];
    let quantities: any[] = [];
    let params;

    params = new HttpParams()
      .set('year', this.currentYear)
      .set('month', this.form.value.currentMonth);

    this.analyticsService
      .getQuantityPerLocation()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log('Response', res);

          if(res.entity.length){
            res.entity.forEach((item) => {
              locations.push(item.location);

              quantities.push(item.quantity);

            });
          }else {
            locations = [];

            quantities = [];
          }



          this.barChartOptions = {
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
              categories: locations,
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
