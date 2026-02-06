import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddStockCategoryComponent } from '../add-stock-category/add-stock-category.component';
import { DeleteStockCategoryComponent } from '../delete-stock-category/delete-stock-category.component';
import { EditStockCategoryComponent } from '../edit-stock-category/edit-stock-category.component';
import { StockCategoriesService } from '../stock-categories.service';

@Component({
  selector: 'app-manage-stock-categories',
  templateUrl: './manage-stock-categories.component.html',
  styleUrls: ['./manage-stock-categories.component.sass']
})
export class ManageStockCategoriesComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "status",
    "postedTime",

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
    private service: StockCategoriesService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  refresh() {
    this.getCategories();
  }

  getCategories() {
    this.service.getAllCategories().subscribe(
      (res) => {
        this.data = res.categoryData;
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
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddStockCategoryComponent, dialogConfig)
    this.dialog.afterAllClosed.subscribe({
      next: () => {
        this.ngOnInit();
      },
    })
  }

  editCall(data:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      cats: data
    }
    this.dialog.open(EditStockCategoryComponent, dialogConfig)
  }

  deleteCall(data:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      cats: data
    }
    this.dialog.open(DeleteStockCategoryComponent, dialogConfig)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
