import { AgmMap } from '@agm/core';
import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { DashboardService } from 'src/app/staff/dashboard/services/dashboard.service';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
import { LookupPickUpLocationsComponent } from '../lookup-pick-up-locations/lookup-pick-up-locations.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RoutesLookUpComponent } from '../routes-look-up/routes-look-up.component';
import { ReturnDeliveryComponent } from '../return-delivery/return-delivery.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  filterform: FormGroup;
  today: Date = new Date();
  formattedDate: string = this.today.toISOString().slice(0, 10);
  date: any;
  fromDate: any;
  toDate: any;
  form: FormGroup;
  mapForm: FormGroup;
  selected = "";
  selectedvalue = "";
  count: any = 0;
  dcount: any = 0;
  dquantity: any = 0.0;
  damount: any = 0.0;
  farmers: any = 0;
  datasize: any = 0;
  farmer: any;
  filename = "collections for " + this.today;
  todaysData: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  @ViewChild('map') map: AgmMap;
  ngAfterViewInit() {
    this.map.fitBounds == true;
    console.log('ngAfterViewInit - Paginator:', this.paginator);
    console.log('ngAfterViewInit - Sort:', this.sort);
    console.log('ngAfterViewInit - Data Source:', this.dataSource ? this.dataSource.data : 'Not initialized');
  }

  collectors: any;
  latitude = 0.1768696;
  longitude = 37.9083264;
  zoom = 8;
  markers: any;
  restriction = {
    latLngBounds: {
      east: 37.995213,
      north: 0.4667,
      south: -4.181611,
      west: 34.287807
    },
    strictBounds: true
  };

  displayedColumns: string[] = [
//     'id',
    'farmer_no',
    'farmer',
    'quantity',
    'session',
    'collection_date',
    'route',
    'pickUpLocation',
    'action',
  ];

  currentDate: any;

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: SalesService,
    private dashboard: DashboardService,
    private snackbar: SnackbarService
  ) {
    this.currentDate = this.getCurrentDate();
  }

//   dataSource!: MatTableDataSource<any>;
    dataSource = new MatTableDataSource<any>([]); // Initialize immediately with empty array


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    this.selected = 'current_date';
    this.getAllFarmers();
    this.smallChart2();
    this.getTodaysData();
    this.getMilkCollectors();
    this.form = this.fb.group({
      date: [''],
      fromDate: [''],
      toDate: [''],
      pickuplocation: [''],
      pickuplocationId: [''],
      route: [''],
      routeId: [''],
      farmer_no: ['']
    });

    this.mapForm = this.fb.group({
      collectorId: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });


    console.log('ngOnInit - Displayed Columns:', this.displayedColumns);
    console.log('ngOnInit - Data Source:', this.dataSource ? this.dataSource.data : 'Not initialized');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  onSelectionChange() {
    switch (this.selected) {
      case 'current_date':
        this.getTodaysData();
        break;
      case 'all':
        this.getData();
        break;
      default:
        break;
    }
  }

  filterByDate() {
    if (this.selected == 'dr') {
      this.fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
      this.toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');
      if (this.fromDate && this.toDate) {
        this.isLoading = true;
        this.getDateRangeSummary(this.fromDate, this.toDate);
        this.subscription = this.service.getCollectionsDateRange(this.fromDate, this.toDate).subscribe(res => {
          this.data = res;
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            this.datasize = this.data.entity.length;
            this.dataSource = new MatTableDataSource(this.data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log('filterByDate - Data Source Updated:', this.dataSource.data);
          } else {
            this.isdata = false;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(null);
            console.log('filterByDate - No data, Data Source:', this.dataSource.data);
          }
        });
      }
    } else if (this.selected == 'sd') {
      this.date = this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd');
      this.isLoading = true;
      this.getDateSummary(this.date, this.date)
      this.subscription = this.service.getCollections(this.date).subscribe(res => {
        this.data = res;
        if (this.data.entity.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          // Binding with the datasource

          this.datasize=this.data.entity.length
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('filterByDate - Data Source Updated:', this.dataSource.data);
        } else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(null);
          console.log('filterByDate - No data, Data Source:', this.dataSource.data);
        }
      });
    } else if (this.selected == 'pul') {
      this.filterByPickUpLoction();
    } else if (this.selected == 'route') {
      this.filterByRoute();
    } else if (this.selected == 'current_date') {
      this.getTodaysData();
    } else if (this.selected == 'all') {
      this.getData();
    } else if (this.selected == 'farmer_no') {
          this.filterByFarmerNo();
     }
  }

  colData: any;
  getMilkCollectors() {
    this.subscription = this.service.getAllCollectors().subscribe(res => {
      this.colData = res;
      if (this.colData.entity.length > 0) {
        this.collectors = this.colData.entity;
      } else {
        this.collectors = [];
      }
    });
  }

  locations: any;
  isCoordinates: boolean = false;
  getCoordinates() {
    this.subscription = this.service.getCollectorLocationsByDate(
      this.mapForm.value.collectorId,
      this.datePipe.transform(this.mapForm.value.date, 'yyyy-MM-dd')
    ).subscribe(res => {
      this.locations = res;
      console.log('getCoordinates - Locations:', this.locations);
      if (this.locations.entity.length > 0) {
        this.isCoordinates = true;
        this.markers = this.locations.entity;
      } else {
        this.markers = [];
      }
    });
  }

  getData() {
    this.isLoading = true;
    this.getAllColectionsSummary();
    this.subscription = this.service.getAllCollections().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        console.log('getData - Entity Data:', this.data.entity);
        this.isLoading = false;
        this.isdata = true;
        this.datasize = this.data.entity.length;
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('getData - Data Source Updated:', this.dataSource.data);
      } else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource(null);
        console.log('getData - No data, Data Source:', this.dataSource.data);
      }
    });
  }

  getTodaysData() {
    this.isLoading = true;
     this.getDateSummary(this.currentDate, this.currentDate)
      this.subscription = this.service.getTodaysCollections(this.currentDate).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.todaysData = this.data.entity;
        console.log('getTodaysData - Entity Data:', this.data.entity);
        this.isLoading = false;
        this.isdata = true;
        this.datasize = this.data.entity.length;
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('getTodaysData - Data Source Updated:', this.dataSource.data);
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(null);
        console.log('getTodaysData - No data, Data Source:', this.dataSource.data);
      }
    });
  }

  stripTimezoneOffset(datetime: string): string {
  return datetime.replace(/(\+|-)\d{2}:\d{2}$/, '');
}


  viewFarmerCollections(row) {
    this.router.navigate(['/staff/sales/farmer', row.farmer_no]);
  }
  getDateSummary(from, to) {
    this.isLoading = true
    // this.date = this.datePipe.transform(this.form.value.date, 'yyyy-MM-dd');
    this.subscription = this.dashboard.getDateCollections(from, to).subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getDateSummary - Data:', this.data);
        this.isLoading = false;
        this.dquantity = this.data.entity[0].quantity;
        this.damount = this.data.entity[0].amount;
        this.dcount = this.data.entity[0].count;
      }
    });
  }

  getDateRangeSummary(from, to) {
    this.isLoading = true;
    this.subscription = this.dashboard.getDateDangeCollections(from, to).subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getDateRangeSummary - Data:', this.data);
        this.isLoading = false;
        this.dquantity = this.data.entity[0].quantity;
        this.damount = this.data.entity[0].amount;
        this.dcount = this.data.entity[0].count;
      }
    });
  }

  getSummaryPerPickUpLocatins(pickUpLocationId) {
    this.isLoading = true;
    this.subscription = this.dashboard.getPickUpLocationCollections(pickUpLocationId, this.fromDate, this.toDate).subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getSummaryPerPickUpLocatins - Data:', this.data);
        this.isLoading = false;
        this.dquantity = this.data.entity[0].quantity;
        this.damount = this.data.entity[0].amount;
        this.dcount = this.data.entity[0].count;
      }
    });
  }

  getSummaryPerRoute(routeId) {
    this.isLoading = true;
    this.subscription = this.dashboard.getRouteCollections(routeId, this.fromDate, this.toDate).subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getSummaryPerRoute - Data:', this.data);
        this.isLoading = false;
        this.dquantity = this.data.entity[0].quantity;
        this.damount = this.data.entity[0].amount;
        this.dcount = this.data.entity[0].count;
      }
    });
  }

getSummaryPerFarmerNo(farmerNo: any) {
  this.isLoading = true;
  this.subscription = this.dashboard.getFarmerCollections(farmerNo, this.fromDate, this.toDate).subscribe(res => {
    this.data = res;
    if (this.data) {
      console.log('getSummaryPerFarmerNo - Data:', this.data);
      this.isLoading = false;
      this.dquantity = this.data.entity[0].quantity;
      this.damount = this.data.entity[0].amount;
      this.dcount = this.data.entity[0].count;
    }
  }, error => {
    console.error('Error fetching summary per farmer:', error);
    this.isLoading = false;
    this.snackbar.showNotification('snackbar-danger', 'Error fetching summary data for farmer');
  });
}


  getAllColectionsSummary() {
    this.isLoading = true;
    this.subscription = this.dashboard.getAllCollectionsRecords().subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getAllColectionsSummary - Data:', this.data);
        this.isLoading = false;
        this.dquantity = this.data.entity[0].quantity;
        this.damount = this.data.entity[0].amount;
        this.dcount = this.data.entity[0].count;
      }
    });
  }

  getAllFarmers() {
    this.subscription = this.service.getAllFarmers().subscribe(res => {
      this.data = res;
      if (this.data) {
        console.log('getAllFarmers - Data:', this.data);
        this.isLoading = false;
        this.farmers = this.data.entity.length;
      }
    });
  }

  dialogData: any;

  selectpickUpLocation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      data: '',
    };
    const dialogRef = this.dialog.open(LookupPickUpLocationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.form.patchValue({
        pickuplocation: this.dialogData.data.name,
        pickuplocationId: this.dialogData.data.id
      });
    });
  }

  selectRoute() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {
          data: "",
      };

      console.log('Opening route selection dialog...');

      const dialogRef = this.dialog.open(RoutesLookUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((result) => {
          console.log('Route dialog result:', result);
          if (result) {
              this.dialogData = result;
              console.log('Route dialog data:', this.dialogData);

              // Store the route data before form update
              const routeName = this.dialogData.data.name || this.dialogData.data.route;
              const routeId = this.dialogData.data.id;

              console.log('Updating form with route:', routeName, 'ID:', routeId);

              this.form.patchValue({
                  route: routeName,
                  routeId: routeId
              });

              console.log('Form values after update:', this.form.value);
          }
      });
  }


  filterByPickUpLoction() {
    let pid = this.form.value.pickuplocationId;
    this.fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');
    if (this.fromDate && this.toDate) {
      this.isLoading = true;
      this.getSummaryPerPickUpLocatins(pid);
      console.log('filterByPickUpLoction - Passed Id:', pid);
      this.subscription = this.service.getCollectionsPerPickUpLocation(pid, this.fromDate, this.toDate).subscribe(res => {
        this.data = res;
        if (this.data) {
          this.isdata = true;
          console.log('filterByPickUpLoction - Data:', this.data);
          this.isLoading = false;
          this.datasize = this.data.entity.length;
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('filterByPickUpLoction - Data Source Updated:', this.dataSource.data);
        } else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(null);
          console.log('filterByPickUpLoction - No data, Data Source:', this.dataSource.data);
        }
      });
    } else {
      this.snackbar.showNotification('snackbar-danger', 'Date Range is Required');
    }
  }

  filterByFarmerNo() {
    this.isLoading = true;
    const farmerNo = this.form.value.farmer_no;
    this.fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
    this.toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');

    console.log('filterByFarmerNo - Parameters:', { farmerNo, fromDate: this.fromDate, toDate: this.toDate });

    if (!farmerNo || !this.fromDate || !this.toDate) {
      console.warn('filterByFarmerNo - Missing required parameters');
      this.isLoading = false;
      this.snackbar.showNotification('snackbar-danger', 'Farmer Number and Date Range are Required');
      return;
    }

    // Call to populate dashboard cards
    this.getSummaryPerFarmerNo(farmerNo);

    this.subscription = this.service.getCollectionsByFarmerNo(farmerNo, this.fromDate, this.toDate).subscribe(
      res => {
        this.data = res;
        const dataArray = this.data.entity ? this.data.entity : Array.isArray(this.data) ? this.data : [];

        if (dataArray.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.datasize = dataArray.length;
          this.dataSource = new MatTableDataSource(dataArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Data Source Data:', this.dataSource.data);
        } else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource([]);
          console.log('No data found for given filters');
        }
      },
      error => {
        console.error('API Error:', error);
        this.isLoading = false;
        this.isdata = false;
        this.dataSource = new MatTableDataSource([]);
        this.snackbar.showNotification('snackbar-danger', 'Error fetching farmer data');
      }
    );
  }



  filterByRoute() {
    console.log('filterByRoute - Form values before filtering:', this.form.value);
      const routeId = this.form.value.routeId;
      this.fromDate = this.datePipe.transform(this.form.value.fromDate, 'yyyy-MM-dd');
      this.toDate = this.datePipe.transform(this.form.value.toDate, 'yyyy-MM-dd');
      console.log('Transformed dates:', this.fromDate, this.toDate);

      if (!routeId || !this.fromDate || !this.toDate) {
          this.snackbar.showNotification('snackbar-danger', 'Please select route and date range');
          return;
      }

      this.isLoading = true;
      this.getSummaryPerRoute(routeId);

      console.log('filterByRoute - Passed Id:', routeId);
      this.subscription = this.service.getCollectionsPerPRoute(routeId, this.fromDate, this.toDate)
          .subscribe({
              next: (res) => {
                  this.data = res;
                  if (this.data) {
                      this.isdata = true;
                      console.log('filterByRoute - Data:', this.data);
                      this.isLoading = false;
                      this.datasize = this.data.entity.length;
                      this.dataSource = new MatTableDataSource(this.data.entity);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      console.log('filterByRoute - Data Source Updated:', this.dataSource.data);
                  } else {
                      this.isdata = false;
                      this.isLoading = false;
                      this.dataSource = new MatTableDataSource([]);
                      console.log('filterByRoute - No data, Data Source:', this.dataSource.data);
                  }
              },
              error: (error) => {
                  console.error('Route API error:', error);
                  this.isLoading = false;
                  this.isdata = false;
                  this.dataSource = new MatTableDataSource([]);
                  this.snackbar.showNotification('snackbar-danger', 'Error fetching route data');
              }
          });
  }


  edit(collection) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      collection: collection
    };
    this.dialog.open(EditCollectionComponent, dialogConfig);
  }

  return(collection) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      collection: collection
    };
    this.dialog.open(ReturnDeliveryComponent, dialogConfig);
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
