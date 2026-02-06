import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { CollectionsComponent } from '../collections/collections.component';

@Component({
  selector: 'app-routes-look-up',
  templateUrl: './routes-look-up.component.html',
  styleUrls: ['./routes-look-up.component.sass']
})
export class RoutesLookUpComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "route",

  ];
  isdata: boolean = false;

  constructor(
    private service: PickupService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<CollectionsComponent>
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
    this.subscription = this.service.getRoutes().subscribe(res => {
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
  this.dialogRef.close({data });
}
}
