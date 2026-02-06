import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountiesService } from '../counties.service';
import { ManageCountiesComponent } from '../manage-counties/manage-counties.component';

@Component({
  selector: 'app-counties-lookup',
  templateUrl: './counties-lookup.component.html',
  styleUrls: ['./counties-lookup.component.sass']
})
export class CountiesLookupComponent implements OnInit {

  displayedColumns: string[] = [
    'code',
    'name',
  ];
  isdata: boolean = false;

  constructor(
    private service: CountiesService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<ManageCountiesComponent>
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
    this.subscription = this.service.getCounties().subscribe(res => {
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
        this.dataSource = new MatTableDataSource<any>(this.data);
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
  this.dialogRef.close({data });
}
}