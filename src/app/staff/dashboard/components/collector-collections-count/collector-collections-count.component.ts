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
  selector: 'app-collector-collections-count',
  templateUrl: './collector-collections-count.component.html',
  styleUrls: ['./collector-collections-count.component.sass'],
})
export class CollectorCollectionsCountComponent
  extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;
  public lineChartOptions: Partial<ChartOptions>;

  chartDispType: any = [2020, 2022, 2023, 2024, 2025];
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
    this.getAllUsers();

    this.chartParametersForm = this.createChartParamtersForm();
  }

  createChartParamtersForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value],
      collectorId: [''],
    });
  }

  onSelectYear(event: any) {
    this.getCollectorCountPerMonth();
  }

  onSelectMonth(event: any) {
    this.getCollectorCountPerMonth();
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

        this.getCollectorCountPerMonth();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCollectorCountPerMonth() {
    this.isLoading = true;

    let months: any[] = [];
    let collections: any[] = [];

    let params = new HttpParams()
      .set('year', this.chartParametersForm.value.year)
      .set('collectorId', this.chartParametersForm.value.collectorId);

    this.analyticsService
      .getCollectorCountPerMonth(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log('Response', res);
          if (res.entity.length > 0) {
            res.entity.forEach((item) => {
              months.push(item.month);
              if (res.entity.length > 0) {
                res.entity.forEach((item) => {
                  months.push(item.month);

                  collections.push(item.colectionsCount);
                });
              } else {
                months = [];

                collections = [];
              }

              collections.push(item.colectionsCount);
            });

            this.lineChartOptions = {
              series: [
                {
                  name: 'Collections Count',
                  data: collections,
                },
              ],
              chart: {
                height: 350,
                type: 'line',
                foreColor: '#9aa0ac',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2,
                },
                toolbar: {
                  show: false,
                },
              },
              colors: ['#177147', '#397157', '#2D7152', '#22714D'],
              stroke: {
                curve: 'smooth',
              },
              grid: {
                row: {
                  colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              markers: {
                size: 3,
              },
              xaxis: {
                categories: months,
                title: {
                  text: 'Months',
                },
              },
              yaxis: {
                // opposite: true,
                title: {
                  text: 'Collections Count',
                },
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5,
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
          }else {

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

            this.getCollectorCountPerMonth();
          }else {
            this.isLoading = true
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
