import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexGrid,
  ApexResponsive,
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { UserchartAnalyticsService } from 'src/app/user/services/userchart-analytics.service';
import { UsermeetingsService } from 'src/app/user/services/usermeetings.service';
import { UsertasksService } from 'src/app/user/services/usertasks.service';

export type chartOptions = {
  series: ApexAxisChartSeries;
  radialseries: ApexNonAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public barChartOptions: Partial<chartOptions>;
  public radialChartOptions: Partial<chartOptions>;
  public gaugeChartOptions: Partial<chartOptions>;
  public stackBarChart: Partial<chartOptions>;


  subscription:Subscription
  data:any
  userTasks:number
  userMeetings:number
  email:string
  closedTask:any
  openTask:any
  upcomingMeetings:any
  upcomingtasks:any

  constructor(


    private usermeetingsService:UsermeetingsService,
    private userTaskService:UsertasksService,
    private tokenStorageService:TokenStorageService,
    private userchartAnalytics:UserchartAnalyticsService
  ) {}

  getUserTasks(email) {
    this.subscription = this.userTaskService.getUserActions(email).subscribe(res => {
      this.data = res;
      // Binding with the datasource
      this.userTasks = this.data.entity.length
      // console.log("--Current user Tasks >> response >> -- ", this.data.entity)
     
    })
  }
  getUserMeetings(email) {
    this.subscription = this.usermeetingsService.getUsermeetings(email).subscribe(res => {
      this.data = res;
      this.userMeetings=this.data.entity.length

   
    })
  }
  getClosedCounts(email,status) {
    this.subscription = this.userchartAnalytics.getCounts(email,status).subscribe(res => {
      this.data = res;
     this.closedTask=this.data.entity
     console.log("--Data >> -- ", this.data.entity) 
    console.log("--Closed >> -- ", this.closedTask)    
    })
  }
  getOpenCounts(email,status) {
    this.subscription = this.userchartAnalytics.getCounts(email,status).subscribe(res => {
      this.data = res;
    this.openTask =this.data.entity
    console.log("--Open >> -- ", this.openTask) 
        
    })
  }
  getUpcomingMeetings(email,days) {
    this.subscription = this.userchartAnalytics.getUpcomingmeetings(email,days).subscribe(res => {
      this.data = res;
    this.upcomingMeetings =this.data.entity.length
    console.log("--upcoming meetings >> -- ", this.data) 
        
    })
  }
  getUpcomingTasks(email,days) {
    this.subscription = this.userchartAnalytics.getUpcomingtasks(email,days).subscribe(res => {
      this.data = res;
    this.upcomingtasks =this.data.entity.length
    console.log("--upcoming tasks >> -- ", this.data) 
        
    })
  }



  toggle(task, nav: any) {
    task.done = !task.done;
  }
  // TODO end

  ngOnInit() {
    this.email = this.tokenStorageService.getUser().email
    this.getUserMeetings(this.email)
    this.getUserTasks(this.email)
    this.getClosedCounts(this.email,"Closed")
    this.getOpenCounts(this.email,"Open")
    this.getUpcomingMeetings(this.email,7)
    this.getUpcomingTasks(this.email,7)
    


    this.chart2();
    this.gaugechart();
    this.stackChart();
  }

  private chart2() {
    this.radialChartOptions = {
      radialseries: [44, 55, 67],
      chart: {
        height: 290,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return "52%";
              },
            },
          },
        },
      },
      labels: ["Project 1", "Project 2", "Project 3"],
    };
  }
  private gaugechart() {
    this.gaugeChartOptions = {
      series2: [72],
      chart: {
        height: 310,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "22px",
              fontWeight: 600,
              color: "#6777EF",
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: "#9aa0ac",
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Closed Ticket"],
    };
  }
  private stackChart() {
    this.stackBarChart = {
      series: [
        {
          name: "Project 1",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Project 2",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "Project 3",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "Project 4",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        foreColor: "#9aa0ac",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#9aa0ac",
      },
      xaxis: {
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
        colors: ["#F0457D", "#704DAD", "#FFC107", "#a5a5a5"],
      },
    };
  }
}
