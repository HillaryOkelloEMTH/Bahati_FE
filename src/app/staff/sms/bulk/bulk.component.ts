import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsService } from '../sms.service';
import { InitiateBulkSmsComponent } from '../initiate-bulk-sms/initiate-bulk-sms.component';
import { DatePipe } from '@angular/common';
import { ComponentsModule } from '../../../shared/components/components.module';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { FarmerStatusLookupComponent } from '../../farmer/pages/farmer-status-lookup/farmer-status-lookup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss'],
})
export class BulkComponent implements OnInit {
  selected: any;
  templates: any;
  displayedColumns: string[] = [
    'id',
    'phoneNumber',
    'sentDate',
    'deliveryDate',
    'category',
    'statusReason',
    'message',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  currentUser: any;
  from: string;
  to: string;
  hasData: boolean = false;
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private service: SmsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.from = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.to = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.getData(this.from, this.to);
    this.getBulkCodes();

    this.filterForm = this.fb.group({
      from: ['', [Validators.required]],
      selected: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });
  }

  getTodaysData() {
    if (this.selected == 'today') {
      this.getData(this.from, this.to);
    }
  }

  filterFarmers() {
    if (this.selected == 'sd') {
      this.getData(
        this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd'),
        this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd')
      );
    } else if (this.selected == 'dr') {
      this.getData(
        this.datePipe.transform(this.filterForm.value.from, 'yyyy-MM-dd'),
        this.datePipe.transform(this.filterForm.value.to, 'yyyy-MM-dd')
      );
    }
  }

  getBulkCodes() {
    this.service.getBulkProcessingCodes().subscribe(
      (res) => {
        this.templates = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  refresh() {
    this.getData(this.from, this.to);
  }

  getData(from: string, to: string) {
    this.isLoading = true;
    console.log('from and to is ', from, to);
    this.service.getByDateRange(from, to).subscribe({
      next: (res) => {
        this.data = res.entity;
        if (this.data != null && this.data.length > 0) {
          this.isLoading = false;
          this.hasData = true;
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<any>(null);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
          this.hasData = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.hasData = false;
        console.log(err);
      },
    });
  }

  readMessage(message) {
    this.snackbar.showNotification('snackbar-success',message)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      test: '',
    };
    this.dialog
      .open(FarmerStatusLookupComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => {
          this.getData(this.from, this.to);
        },
        complete: () => {
          this.getData(this.from, this.to);
        },
      });
  }
}
