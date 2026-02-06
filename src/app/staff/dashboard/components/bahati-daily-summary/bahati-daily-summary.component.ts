import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
import { line } from 'd3-shape';
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
import { AnalyticsService } from 'src/app/data/services/analytics.service';

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
  selector: 'app-bahati-daily-summary',
  templateUrl: './bahati-daily-summary.component.html',
  styleUrls: ['./bahati-daily-summary.component.sass']
})
export class BahatiDailySummaryComponent implements OnInit {
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


  days: any[] = []
  qty: any[] = []
  isLoading: boolean;
  currentYear = new Date().getFullYear();
  currentMonth = this.monthsArray[new Date().getMonth()];
  chartForm: FormGroup;

  constructor(private fb: FormBuilder, private analyticsService: AnalyticsService,) { }

  ngOnInit(): void {
    this.chartForm = this.chartsForm()

    this.getBahatiDailySummary()
  }

  chartsForm() {
    return this.fb.group({
      year: [this.currentYear],
      month: [this.currentMonth.value]
    });
  }

  onMonthChange() {
    this.getBahatiDailySummary()
  }

  onYearChange() {
    this.getBahatiDailySummary();
  }


  getBahatiDailySummary() {
    this.isLoading = true;
    this.days = []
    this.qty = []

    this.analyticsService.getBahatiDailySummary(this.chartForm.value.month, this.chartForm.value.year).subscribe({
      next: (res) => {
        if (res.entity.length > 0) {
          res.entity.forEach(item => {
            this.days.push(item.day);
            this.qty.push(item.qty);
          })

          console.log("days to display", this.days)
          console.log("qty is ", this.qty)
        } else {
          this.days = []
          this.qty = []
        }


        this.lineChartOptions = {
          series: [
            {
              name: "Qty (kgs)",
              data: this.qty
            }
          ],
          chart: {
            height: 350,
            type: "line",
            foreColor: "9aa0ac",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            toolbar: {
              show: false
            }
          },
          colors: ["#177147", "#397157", "#2D7152", "#22714D"],
          stroke: {
            curve: "smooth"
          },
          grid: {
            row: {
              colors: ["transparent", "transparent"],
              opacity: 0.5
            }
          },
          markers: {
            size: 3
          },
          xaxis: {
            categories: this.days,
            title: {
              text: "Days"
            }
          },
          yaxis: {
            title: {text: "Qty (kgs)"}
          },
          legend: {
            position: 'top',
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5
          },
          tooltip: {
            theme: "dark",
            marker: {
              show: true,
            },
            x: {
              show: true
            }
          }
        }

        this.isLoading = false;
      },
      error: (error) => {}
    })
  }



}
