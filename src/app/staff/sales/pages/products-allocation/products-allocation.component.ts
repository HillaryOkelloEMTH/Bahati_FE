import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { VerifyproductAllocationsComponent } from '../../verifyproduct-allocations/verifyproduct-allocations.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-products-allocation',
  templateUrl: './products-allocation.component.html',
  styleUrls: ['./products-allocation.component.scss']
})
export class ProductsAllocationComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "farmer_no",
    "username",
    "product",
    "quantity",
    "amount",
    "requestedOn",
    "approvalDate",
    // "type",
    "route",
    "location",
    "status",
    // "Actions",
  ];
  displayedColumns1: string[] = [
    "id",
    "username",
    "product",
    "quantity",
    "amount",
    "allocationDate",
    "type",
    "status",
    "paymentStatus",
    "Actions",
  ];
  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  goods: any;
  services: any;
  goods_data: any;
  error: any;
  isLoading: boolean = true;
  currentUser: any;
  filtering: boolean = false
  selected: string = ''
  filterForm: FormGroup
  from: any
  to: any

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private service: SalesService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // this.getGoods("Good");
    this.from = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.to = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.filterForm = this.fb.group({
      from: [this.from, [Validators.required]],
      to: [this.to, [Validators.required]],
      selected: ['',]
    })
    this.getSales();
    this.getallcataionPerType("Service");
    this.selected = ''
  }

  refresh() {
    this.getSales()
  }

  filterData() {
    this.filtering = !this.filtering

    console.log("the filtering value is ", this.filtering)
  }

  stripTimezoneOffset(datetime: string): string {
    return datetime
  }


  getGoods(type) {
    this.service.getSalesPerType(type).subscribe(
      (res) => {
        this.goods = res.entity;
        console.log("Goods" + res.entity)
        if (this.goods != null) {
          this.goods_data = true
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.goods);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.goods_data = false
          this.isLoading = false
        }
      },
      (err) => {
        this.isLoading = false;
        this.goods_data = false
        console.log(err);
      }
    );
  }

  getSales() {
    this.service.getSales().subscribe(
      (res) => {
        this.goods = res.entity;
        console.log("Goods")
        if (this.goods != null) {
          this.isLoading = false;
          this.goods_data = true
          this.dataSource = new MatTableDataSource<any>(this.goods);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
        this.goods_data = false
      }
    );
  }

  getSalesByDate() {
    console.log("the selected value is {}", this.selected)
    this.isLoading = true;
    if (this.selected === 'sd') {
      this.from = this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd');
      this.to = this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd');
    } else if (this.selected === 'dr') {
      this.from = this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd');
      this.to = this.datePipe.transform(this.filterForm.value.to, 'yyyy-MM-dd');
    } else if (this.selected === 'today') {
      this.from = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.to = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }


    this.service.getSalesByDate(this.from, this.to).subscribe({
      next: (res) => {
        this.goods = res.entity;

        if (this.goods != null) {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.goods);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.filtering = false
        } else {
          this.dataSource = new MatTableDataSource<any>(null);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.goods_data = false;
      }
    })

  }

  getallcataionPerType(type: any) {
    this.service.getSalesPerType(type).subscribe(
      (res) => {
        this.services = res.entity;
        console.log("services" + this.service)
        if (this.services != null) {
          this.isLoading = false;
          this.dataSource1 = new MatTableDataSource<any>(this.services);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }



  readMessage(message) {
    this.snackbar.showNotification("snackbar-success", message);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verify(row) {
    console.log(row)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      row: row
    }
    this.dialog.open(VerifyproductAllocationsComponent, dialogConfig)
  }

}
