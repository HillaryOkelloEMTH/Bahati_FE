import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { AdministrationService } from '../administration.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bulk-delivery',
  templateUrl: './bulk-delivery.component.html',
  styleUrls: ['./bulk-delivery.component.sass']
})
export class BulkDeliveryComponent implements OnInit {
  dcount: number = 0
  dquantity: number = 0.0
  selected = ""
  form!: FormGroup
  currentDate: any
  dataSource: MatTableDataSource<any>
  isLoading: boolean = false
  isdata: boolean = false
  data: any [] = []

  displayedColumns: any = [
    'id',
    "farmerNo",
    'farmer',
    "quantity",
    "session",
    "date",
    "postedOn",
    'postedBy',
    'reason'
  ]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort
  @ViewChild('filter', {static: true}) filter: ElementRef


  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: AdministrationService, private datePipe: DatePipe) { this.currentDate = this.getCurrentDate()}

  ngOnInit(): void {
    this.initForm(),
    this.getTodaysUploads(this.currentDate)
  }

  initForm() {
    this.form = this.fb.group({
      status: [''],
      date: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]]
    })
  }


  getTodaysUploads(date: any) {
    this.isLoading = true;
    this.isdata = false;
    this.service.getTodaysUploads(date).subscribe({
      next: (resp) => {
        if (resp.entity.length > 0) {
          this.data = resp.entity
          this.isdata = true
          this.isLoading = false;

          this.dcount = resp.entity.length
          this.dquantity = resp.entity.reduce((sum, current) => sum + current.quantity, 0.0)
          this.dataSource = new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.dcount = 0;
          this.dquantity = 0.0
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(null)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {}
    })

  }

  filterByDate() {
    const from = this.datePipe.transform(this.form.value.fromDate, "yyyy-MM-dd")
    const to = this.datePipe.transform(this.form.value.toDate, "yyyy-MM-dd")
    const date = this.datePipe.transform(this.form.value.date, "yyyy-MM-dd")

    this.service.filterBulkUploads(from, to).subscribe({
      next: (resp) => {
        if (resp.entity.length > 0) {
          this.data = resp.entity
          this.isLoading = false
          this.isdata = true
          this.dcount = resp.entity.length
          this.dquantity = resp.entity.reduce((sum, quantity) => sum + quantity, 0.0)

          this.dataSource = new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.dcount = 0;
          this.dquantity = 0.0
          this.isLoading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(null)

        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {}
    })
  }


  filterBySpecificDate() {
    const from = this.datePipe.transform(this.form.value.fromDate, "yyyy-MM-dd")
    const to = this.datePipe.transform(this.form.value.toDate, "yyyy-MM-dd")
    const date = this.datePipe.transform(this.form.value.date, "yyyy-MM-dd")

    this.service.getTodaysUploads(date).subscribe({
      next: (resp) => {
        if (resp.entity.length > 0) {
          this.data = resp.entity
          this.isLoading = false
          this.isdata = true
          this.dcount = resp.entity.length
          this.dquantity = resp.entity.reduce((sum, quantity) => sum + quantity, 0.0)

          this.dataSource = new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.dcount = 0;
          this.dquantity = 0.0
          this.isLoading = false;
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(null)
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {}
    })
  }

  onSelectionChange() {
    if (this.selected == "current_date") {
      this.getTodaysUploads(this.currentDate)
    }
  }


  filterData() {
    console.log("status", this.form.value.status)
    this.isLoading = true
    const status = this.form.value.status

    if (this.data.length > 0) {
      this.isLoading = false
      let filteredData = this.data

      if (status === "success") {
        console.log("data lenght", this.data.length)
        console.log("data at row one", this.data[0])
        filteredData = this.data.filter(item => item.reason === "Success");
      } else {   
        filteredData = this.data.filter(item => item.reason != "Success");
      }

      this.isdata = true
      this.isdata = true

      this.dcount = filteredData.length
      this.dquantity = filteredData.reduce((sum, item) => sum + item.quantity, 0.0)

      this.dataSource = new MatTableDataSource<any>(filteredData)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    } else {
      this.isLoading = false;
      this.isdata = false;
    }
  }

  uploadDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      test: ""
    }

    this.dialog.open(UploadDialogComponent, dialogConfig)
    this.dialog.afterAllClosed.subscribe({
      next: (res) => {
        this.ngOnInit()
      }
    })
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

}
