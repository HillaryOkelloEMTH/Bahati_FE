import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/reports/services/reports.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatterService } from 'src/app/shared/services/formatter.service';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss'],
})
export class CollectionDetailsComponent implements OnInit {
  today: Date = new Date();
  formattedDate: string = this.today.toISOString().slice(0, 10);

  displayedColumns: string[] = [
    'select',
    'quantity',
    'amount',
    'collector',
    'session',
    // 'pickUpLocation',
    'collection_date',
    'paid',
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  farmerNo: any;
  form: FormGroup
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private service: SalesService,
    private reportservice: ReportsService,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public formatter: FormatterService
  ) {
    this.today = this.getCurrentDate();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  allocationsDataSource!: MatTableDataSource<any>;
  @ViewChild('allocationsPaginator', { static: false })
  allocationsPaginator!: MatPaginator;
  @ViewChild('allocationSort', { static: false }) collectorsSort!: MatSort;
  allocationsDisplayedColumns: string[] = [
    'id',
    'time',
    'product',
    'username',
    'amount',
    // 'revokeStatus',
    'paymentStatus',
    // 'allocatedBy',
    'quantity',
    'allocationDate',
  ];
  allocationsArray: any[] = [];
  allocationsNotAdded: boolean = true;
  allocationsIndex: any;
  updateCollectorsSelected: boolean = false;
  payedAccruals: number = 0;
  notPayedAccruals: number = 0;
  amountOnAllocatedItems: number = 0;
  totalAmountOnMilkDelivered: number = 0;
  amountPayedOnCollections: number = 0;
  amountNotPayedOnCollections: number = 0;
  quantity: number = 0.0

  ngOnInit(): void {
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    })

    this.route.params.subscribe((params: Params) => {
      this.farmerNo = params['fno'];
      // Use the id parameter in your component logic
    });

    this.getByFarmerNo(this.farmerNo);
    this.getTodaysCollections();
    this.getFarmerAllocations(this.farmerNo);
    this.getPayedFarmerAccruals(this.farmerNo);
    this.getNonPayedFarmerAccruals(this.farmerNo);
    this.getFarmerAmountOnNotPayedCollections(this.farmerNo);
    this.getFarmerAmountOnPayedCollections(this.farmerNo);
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  farmer: any;
  present: boolean = false;
  found: boolean = false;
  selection = new SelectionModel<any>(true, []);

  getByFarmerNo(farmerNo: any) {
    this.service.getByFarmerNo(farmerNo).subscribe((res) => {
      this.farmer = res.entity;
      if (this.farmer.username != null || this.farmer.username != undefined) {
        this.present = true;
        console.log("farmer data ", this.farmer)
      } else {
        this.present = false;
      }
    });
  }


  getTodaysCollections() {
    this.isLoading = true;
    this.service.filterCollections(this.farmerNo, this.today, this.today).subscribe((res) => {
      this.data = res;

      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        this.quantity = this.data.entity.reduce((sum, current) => sum + current.quantity, 0.0).toFixed(2);

        let data: any[] = []
        data = this.data.entity

        // data.forEach((c) => {
        //   console.log("the date if ", this.formatter.formatTime(c.date))
        //   return this.formatter.formatTime(c.date)
        // })

        // Binding with the datasource
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.isdata = false;
        this.isLoading = false;

        // this.dataSource = new MatTableDataSource<any>(this.data);
      }
    });
  }

  stripTimezoneOffset(datetime: string): string {
    return datetime.replace(/(\+|-)\d{2}:\d{2}$/, '');
  }

  filterCollections() {
    if (this.form.valid) {
      this.isLoading = true;
      const from = this.datePipe.transform(this.form.value.from, "yyyy-MM-dd")
      const to = this.datePipe.transform(this.form.value.to, "yyyy-MM-dd")
      this.service.filterCollections(this.farmerNo, from, to).subscribe((res) => {
        this.data = res;

        if (this.data.entity.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.quantity = this.data.entity.reduce((sum, current) => sum + current.quantity, 0.0).toFixed(2);

          // Binding with the datasource
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isdata = false;
          this.isLoading = false;
          // this.dataSource = new MatTableDataSource<any>(this.data);
        }
      });
    } else {
      this.snackbar.showNotification('snackbar-danger', "from and to date required");
    }
  }

  getFarmerAllocations(id) {
    this.service.getFarmerAllocations(id).subscribe((res) => {
      this.allocationsArray = res.entity;

      if (this.allocationsArray.length > 0) {
        this.allocationsNotAdded = false;

        this.allocationsArray.forEach(allocation => {
          this.amountOnAllocatedItems = this.amountOnAllocatedItems + allocation.amount;
        })

        this.allocationsDataSource = new MatTableDataSource(this.allocationsArray);
        this.allocationsDataSource.paginator = this.allocationsPaginator;
      } else {
        this.isdata = false;
        this.isLoading = false;
      }
    });
  }

  refreshAllocations() {
    this.getFarmerAllocations(this.farmerNo)
  }



  generateSTatement(farmerId: any, from: any, to: any) {
    this.reportservice.generatefarmerCollections(farmerId, from, to).subscribe(
      (response) => {
        console.log(response);
        let url = window.URL.createObjectURL(response.data);

        // if you want to open PDF in new tab
        window.open(url);

        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

        this.isLoading = false;

        this.snackbar.showNotification(
          'Report generated successfully',
          'snackbar-success'
        );
      },
      (err) => {
        console.log(err);
        this.isLoading = false;

        this.snackbar.showNotification(
          'Report could not be generated successfully',
          'snackbar-danger'
        );
      }
    );
  }

  // accruals: any;
  // getAccruals() {
  //   this.service.getFarmerAccruals(this.farmerid).subscribe((res) => {
  //     this.accruals = res.entity;
  //     if (this.accruals != null) {
  //       this.found = true;
  //     }
  //   });
  // }

  getPayedFarmerAccruals(id) {
    this.service.getFarmerAllocationAccruals(id, "Y").subscribe((res) => {
      this.payedAccruals = res.entity.accruedamount;

      if (res.entity.accruedamount != null) {
        this.payedAccruals = res.entity.accruedamount;
      } else {
        this.payedAccruals = 0;
      }

      console.log("Payed Accruals", res)
      // if (this.accruals != null) {
      //   this.found = true;
      // }
    });
  }

  getNonPayedFarmerAccruals(id) {
    this.service.getFarmerAllocationAccruals(id, "N").subscribe((res) => {

      if (res.entity.accruedamount != null) {
        this.notPayedAccruals = res.entity.accruedamount;
      } else {
        this.notPayedAccruals = 0;
      }

    });
  }

  getFarmerAmountOnPayedCollections(id) {
    this.service.getFarmerPayments(id, "Y").subscribe((res) => {

      if (res.entity != null) {
        this.amountPayedOnCollections = res.entity;
      } else {
        this.amountPayedOnCollections = 0;
      }

    });
  }

  getFarmerAmountOnNotPayedCollections(id) {
    this.service.getFarmerPayments(id, "N").subscribe((res) => {

      if (res.entity != null) {
        this.amountNotPayedOnCollections = res.entity;
      } else {
        this.amountNotPayedOnCollections = 0;
      }

    });
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  navigateBackToFarmers() {
    this.location.back();
  }

  applyAllocationFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allocationsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.allocationsDataSource.paginator) {
      this.allocationsDataSource.paginator.firstPage();
    }
  }
}
