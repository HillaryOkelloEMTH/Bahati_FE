import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CollectionsComponent } from '../collections/collections.component';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lookup-pick-up-locations',
  templateUrl: './lookup-pick-up-locations.component.html',
  styleUrls: ['./lookup-pick-up-locations.component.sass']
})
export class LookupPickUpLocationsComponent implements OnInit {

  displayedColumns: string[] = [
    "id",
    "name",
    "landmark"
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
    this.subscription = this.service.getLocations().subscribe(res => {
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

