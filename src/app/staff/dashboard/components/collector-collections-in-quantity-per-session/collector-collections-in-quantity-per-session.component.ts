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
  selector: 'app-collector-collections-in-quantity-per-session',
  templateUrl: './collector-collections-in-quantity-per-session.component.html',
  styleUrls: ['./collector-collections-in-quantity-per-session.component.sass'],
})
export class CollectorCollectionsInQuantityPerSessionComponent extends BaseComponent
  implements OnInit
{
  public barChartOptions: Partial<ChartOptions>;

  chartDispType: any = [2020, 2022, 2023, 2024, 2025];
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
  chartParametersForm: FormGroup;
  needYear = false;
  needMonth = false;
  poneedYear = false;
  poneedMonth = false;
  month: any;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  currentEmail: any;
  currentMeeting: any;
  years: Object;
  meetingYears: any[] = [];
  year: any;

  meetings: any[] = [];
  meetingsExist: boolean = false;
  meetingTitle: string

  public doughnutChartLabels: string[] = ["Session 1", "Session 2", "Session 3"];
  public doughnutChartData: number[] = [];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#2D7152", "#4F7161", "#66716C", "#22714D"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };

  sessionOne:number = 0;
  sessionTwo: number = 0;
  sessionThree: number = 0;
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
      collectorId: [""]
    });
  }


  onSelectYear(event: any){
    this.getCollectorSessionData()
  }

  onSelectMonth(event: any){
    this.getCollectorSessionData()
  }


  collectorsLookup(){
    const dialogRef = this.dialog.open(CollectorsLookupsComponent, {
      width: "600px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.chartParametersForm.patchValue({
          collectorId: result.data.id,
        });

        this.getCollectorSessionData()
      },
      (err) => {
        console.log(err);
      }
    );

  }

  getCollectorSessionData() {
    this.isLoading = true;

    let sessionOne: any[] = [];
    let sessionTwo: any[] = [];
    let sessionThree: any[] = [];

    // this.currentMeeting = this.chartParametersForm.controls.meetingid.value;

    let params = new HttpParams()
    .set("year", this.chartParametersForm.value.year)
    .set("month", this.chartParametersForm.value.month)
    .set("collectorId", this.chartParametersForm.value.collectorId)

    this.analyticsService
      .getCollectorSessionData(params)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("RESPONCE ", res)
          this.doughnutChartData = [];

          res.entity.forEach((item) => {

            if(item.session == "Session 1"){
              sessionOne.push(item.quantity)
              
              this.sessionOne = parseInt(sessionOne[0]);

              console.log("SESSION ONE ", this.sessionOne);

              this.doughnutChartData.push(this.sessionOne);
            }

            if(item.session == "Session 2"){
              sessionTwo.push(item.quantity);
             
              this.sessionTwo = parseInt(sessionTwo[0]);

              console.log("SESSION TWO ", this.sessionTwo)

              this.doughnutChartData.push(this.sessionTwo);
            }


            if(item.session == "Session 3"){
              sessionThree.push(item.quantity);

              this.sessionThree = parseInt(sessionThree[0]);

              console.log("SESSION THREE ", this.sessionThree);

              this.doughnutChartData.push(this.sessionThree);
            }
          });

          console.log("DOUGHNUT CHAT ", this.doughnutChartData)

          this.isLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllUsers(){
    this.userService.fetchAllActiveAccounts().pipe(takeUntil(this.subject)).subscribe(res => {
      let users = res.userData;

      users.forEach(user => {
        console.log(user)
        if(user.roles[0].name == "ROLE_COLLECTOR"){
          this.collectors.push(user);
        }
      })

      console.log("COLLECTORS ", this.collectors)

      if(this.collectors.length > 0){
        this.chartParametersForm.patchValue({
          collectorId: this.collectors[0].id
        })

        this.getCollectorSessionData();
      }
    }, err => {
      console.log(err)
    })
  }
}
