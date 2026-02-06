import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SmsService } from '../sms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateTemplateComponent } from '../create-template/create-template.component';
import { EditTemplateComponent } from '../edit-template/edit-template.component';
import { ViewTemplateBodyComponent } from '../view-template-body/view-template-body.component';
import { DeleteTemplateComponent } from '../delete-template/delete-template.component';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.sass']
})
export class SmsTemplateComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "templateName",
    "createdBy",
    "createdOn",
    "actions",
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

    this.service.getAllTemplates().subscribe(
      (res) => {
        this.data = res;
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
    dialogConfig.width = "45%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(CreateTemplateComponent, dialogConfig)
  }

  editCall(row:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "45%"
    dialogConfig.data = {
      data: row
    }
    this.dialog.open(EditTemplateComponent, dialogConfig)
  }

  viewCall(row:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      data: row
    }
    this.dialog.open(ViewTemplateBodyComponent, dialogConfig)
  }

  deleteCall(row:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      data: row
    }
    this.dialog.open(DeleteTemplateComponent, dialogConfig)
  }

}
