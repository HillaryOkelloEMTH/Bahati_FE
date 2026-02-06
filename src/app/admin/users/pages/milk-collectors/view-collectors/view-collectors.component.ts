import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
// import { Account } from '../models/account';

@Component({
  selector: 'app-view-collectors',
  templateUrl: './view-collectors.component.html',
  styleUrls: ['./view-collectors.component.sass']
})
export class ViewCollectorsComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "username",
    "email",
    "name",
    "action"
  ];

  selected = 'all';
  users: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isLoading = true;
  isdata:boolean;

  constructor(
    private accountService: AuthService,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private router: Router
  ) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllUsers();
  }

  refresh() {
    this.getAllUsers();
  }

  fetchData() {
    if (this.selected == "all") {
      this.getAllUsers();
    }
    else if (this.selected == "active") {
      this.getActiveUserAccounts();
    }
    else if (this.selected == "locked") {
      this.getLockedAccounts();
    }
    else if (this.selected == "deleted") {
      this.getDeletedAccounts();
    }
  }

  getAllUsers() {
    this.accountService.allUsers()
      .subscribe(
        (res) => {
          this.users = res.userData;
          if (this.users.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            this.dataSource = new MatTableDataSource<any>(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else {
            this.isdata = false;
            this.dataSource = new MatTableDataSource<any>(this.users);
          }
        }
      );
  }


  getActiveUserAccounts() {
    this.isdata = false;
    this.accountService.allActiveUsers().subscribe(
      (res) => {
        this.users = res;
        if (this.users.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(this.users);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }

  getLockedAccounts() {
    this.isdata = false;
    this.accountService.allLockedUserAccounts().subscribe(
      (res) => {
        this.users = res;
        if (this.users.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(this.users);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }

  getDeletedAccounts() {
    this.isdata = false;
    this.accountService.allDeletedUserAccounts().subscribe(
      (res) => {
        this.users = res;
        if (this.users.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource<any>(this.users);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}