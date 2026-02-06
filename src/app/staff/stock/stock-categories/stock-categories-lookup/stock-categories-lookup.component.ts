import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InventoryManagementComponent } from '../../inventory/inventory-management/inventory-management.component';
import { StockCategoriesService } from '../stock-categories.service';

@Component({
  selector: 'app-stock-categories-lookup',
  templateUrl: './stock-categories-lookup.component.html',
  styleUrls: ['./stock-categories-lookup.component.sass']
})
export class StockCategoriesLookupComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'description',
  ];
  isdata: boolean = false;

  constructor(
    private service: StockCategoriesService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<InventoryManagementComponent>
  ) {
  }


  subscription!: Subscription;
  data: any;
  paginator: any;
  sort: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData() {
    this.isLoading = true;
    this.subscription = this.service.getAllActiveCategories().subscribe(res => {
      this.data = res.categoryData;
      if (this.data !=null) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(null);
      }
    })
  }

  roles: any;
  dataSource!: MatTableDataSource<any>;
  isLoading: boolean = false;


  ngOnInit(): void {
    this.getData();
  }

  close() {
    this.dialogRef.close();
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data });
  }
}