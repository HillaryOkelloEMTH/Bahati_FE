import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddMilkCanComponent } from '../add-milk-can/add-milk-can.component';
import { DeleteMilkCanComponent } from '../delete-milk-can/delete-milk-can.component';
import { EditMilkCanComponent } from '../edit-milk-can/edit-milk-can.component';
import { MilkCansService } from '../milk-cans.service';

@Component({
  selector: 'app-manage-milk-cans',
  templateUrl: './manage-milk-cans.component.html',
  styleUrls: ['./manage-milk-cans.component.sass']
})
export class ManageMilkCansComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "canNo",
    "canName",
    "weight",
    "deductionWeight",
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
    private service: MilkCansService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  refresh() {
    this.getData();
  }

  getData() {

    this.service.getAllCans().subscribe(
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

  hasAccess: boolean;

  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "50%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddMilkCanComponent, dialogConfig)
  }

  editCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "50%"
    dialogConfig.data = {
      cans: data
    }
    this.dialog.open(EditMilkCanComponent, dialogConfig)
  }

  deleteCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      cans: data
    }
    this.dialog.open(DeleteMilkCanComponent, dialogConfig)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
