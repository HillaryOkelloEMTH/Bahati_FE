import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmerStatementComponent } from 'src/app/reports/farmer-statement/farmer-statement.component';
import { FarmerService } from '../../services/farmer.service';

@Component({
  selector: 'app-farmer-lookup',
  templateUrl: './farmer-lookup.component.html',
  styleUrls: ['./farmer-lookup.component.sass']
})
export class FarmerLookupComponent implements OnInit {
  displayedColumns: string[] = [
    "farmerNo",
    "username",
    "memberType",
    "mobileNo"
  ];
  isdata: boolean = false;

  constructor(
    private service: FarmerService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<FarmerStatementComponent>
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
    this.subscription = this.service.getFarmers().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(null);
      }
    })
  }

  dataSource!: MatTableDataSource<any>;
  isLoading: boolean = false;


  ngOnInit(): void {
    this.getData();
  }

  close() {
    this.dialogRef.close();
 }

 onSelectRow(data: any) {
  console.log(data)
  this.dialogRef.close({data });
}
}
