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
import { CollectorsLookupsComponent } from '../../look-ups/collectors-lookups/collectors-lookups.component';

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
  selector: 'app-collections-quantity',
  templateUrl: './collections-quantity.component.html',
  styleUrls: ['./collections-quantity.component.sass'],
})
export class CollectionsQuantityComponent
  extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: number[] = [2020, 2022, 2023, 2024, 2025];

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

  chartParametersForm: FormGroup;
  quantityChartSelected: boolean = false;
  priceChartSelected: boolean = true;
  collectors: any[] = [];

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

    this.getAllUsers();
  }

  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      collectorId: [''],
    });
  }

  onSelectYear(event: any) {
    this.getCollectorCollectionSPerMonth();
  }

  collectorsLookup() {
    const dialogRef = this.dialog.open(CollectorsLookupsComponent, {
      width: '600px',
      data: {
        action: 'Meeting Categories Lookup',
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.chartParametersForm.patchValue({
          collectorId: result.data.id,
        });

        this.getCollectorCollectionSPerMonth();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCollectorCollectionSPerMonth() {
    this.isLoading = true;

    let months: any[] = [];
    let quantities: any[] = [];
    let params;

    params = new HttpParams()
      .set('year', this.chartParametersForm.value.year)
      .set('collectorId', this.chartParametersForm.value.collectorId);

    this.analyticsService
      .getCollectionsPerMonth(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log('Response', res);

          if (res.entity.length > 0) {
            res.entity.forEach((item) => {
              months.push(item.month);

              quantities.push(item.quantity);

            });

            this.barChartOptions = {
              series: [
                {
                  name: 'Price (KES)',
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
                categories: months,
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
          } else {
            months = [];

            quantities = [];

            this.isLoading = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllUsers() {
    this.userService
      .fetchAllActiveAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          let users = res.userData;

          users.forEach((user) => {
            console.log(user);
            if (user.roles[0].name == 'ROLE_COLLECTOR') {
              this.collectors.push(user);
            }
          });

          console.log('COLLECTORS ', this.collectors);

          if (this.collectors.length > 0) {
            this.chartParametersForm.patchValue({
              collectorId: this.collectors[0].id,
            });

            this.getCollectorCollectionSPerMonth();
          }else {
            this.isLoading = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
