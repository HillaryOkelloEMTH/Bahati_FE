import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SendSmsComponent } from '../send-sms/send-sms.component';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-sms-management',
  templateUrl: './sms-management.component.html',
  styleUrls: ['./sms-management.component.sass']
})
export class SmsManagementComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "messageId",
    "phoneNumber",
    "sentDate",
    "status",
    "statusReason",
    "message",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackbar:SnackbarService,
    private service: SmsService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  refresh() {
    this.getData();
  }

  getData() {

    this.service.getAllSMS().subscribe(
      (res) => {
        this.data = res.entity;
        if (this.data != null) {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  readMessage(message)
  {
    this.snackbar.showNotification("snackbar-success", message);
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
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(SendSmsComponent, dialogConfig)
  }

}
