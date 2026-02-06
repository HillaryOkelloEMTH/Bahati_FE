import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { SalesService } from 'src/app/staff/sales/services/sales.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  collectionSummaryForm: FormGroup
  isloading: boolean

  date: any
  quantity: any = 0.0;
  amount: any = 0.0;
  farmers: any = 0
  count: any = 0
  isdata: boolean = false;
  todaysData: any
  currentDate: any


  data: any;
  subscription!: Subscription;
  loaded: boolean = false;
  userTasks: number
  userMeetings: number
  email: string
  closedTask: any
  openTask: any
  upcomingMeetings: any
  upcomingtasks: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  constructor(
    private service: DashboardService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private dashboard: DashboardService,
    private saleService: SalesService
  ) {
    this.currentDate = this.getCurrentDate()
  }


  ngOnInit() {
    this.collectionSummaryForm = this.fb.group(
      {
        date: ["", [Validators.required]],
      }
    )

    this.getDateSummary(this.currentDate, this.currentDate)
    // this.getAllColectionsSummary();
    this.getAllFarmers();
    this.smallChart2()
  }

  getAllColectionsSummary() {
    this.isloading = true

    this.service.getAllCollectionsRecords().subscribe(res => {
      this.isloading = false
      console.log("All collections Summary"+ res.entity[0])
      this.loaded = true
      this.quantity = this.data.entity[0].quantity;
      this.amount = res.entity[0].amount;
      this.count = this.data.entity[0].count
    });
  }

  getAllFarmers() {
    this.subscription = this.service.getAllFarmers().subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log(this.data)
        this.loaded = true;
        this.farmers = this.data.entity.length
      }
    });


  }


  getTodaysData() {
    this.isloading = true;
      this.subscription = this.service.getTodaysCollections(this.currentDate).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.todaysData = this.data.entity
        console.log(this.data.entity)
        this.isloading = false;
        this.isdata = true;
        // Binding with the datasource
      }
      else {
        this.isdata = false;
        this.isloading = false
      }
    })
  }

  getDateSummary(from: any, to: any) {
    this.isloading = true
    // this.date = this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd');
    this.service.getDateCollections(from, to).subscribe(res => {
      if (res) {
        this.isloading = false
        this.isloading = true;
        this.quantity = res.entity[0].quantity;
        this.amount = res.entity[0].amount;
        this.count = res.entity[0].count
      }
    });


  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  private smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: "New Clients",
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(253,126,20,.7)",
        pointBackgroundColor: "rgba(253,126,20,.2)",
        backgroundColor: "rgba(253,126,20,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart2Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }


}
