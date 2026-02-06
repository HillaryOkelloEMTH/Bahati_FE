import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentsService } from '../departments.service';
import { ManageDepartmentsComponent } from '../manage-departments/manage-departments.component';

@Component({
  selector: 'app-lookupdepartments',
  templateUrl: './lookupdepartments.component.html',
  styleUrls: ['./lookupdepartments.component.scss']
})
export class LookupdepartmentsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'departmentCode',
    'departmentName',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  index: number;
  id: number;
  isLoading: boolean;
  subscription!: Subscription;
  data: any;

  constructor(
    private service: DepartmentsService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<ManageDepartmentsComponent>
  ) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getAllDepartments();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.dialogRef.close();
  }

  getAllDepartments() {
    this.subscription = this.service.getDepartments().subscribe(res => {
      this.data = res;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


}
