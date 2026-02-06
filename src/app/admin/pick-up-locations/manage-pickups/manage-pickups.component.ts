import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddPickupComponent } from '../add-pickup/add-pickup.component';
import { DeletePickupComponent } from '../delete-pickup/delete-pickup.component';
import { EditPickupComponent } from '../edit-pickup/edit-pickup.component';
import { PickupService } from '../pickup.service';

import { ViewPickupComponent } from '../view-pickup/view-pickup.component';

@Component({
  selector: 'app-manage-pickups',
  templateUrl: './manage-pickups.component.html',
  styleUrls: ['./manage-pickups.component.sass']
})
export class ManagePickupsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'subCounty',
    'ward',
    'landMark',
    'collectors',
    'action',
  ];

  Locations: any;
  dataSource!: MatTableDataSource<any>;
  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;


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
        this.isLoading = false;
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    })
  }


  constructor(private router: Router, private dialog: MatDialog, private service: PickupService,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData();
  }

  addLocationCall() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "60%"
    // dialogConfig.data = {
    //   test: ""
    // }
    // this.dialog.open(AddPickupComponent, dialogConfig)

    const dialogRef = this.dialog.open(AddPickupComponent, {
      width: "60%",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
       this.getData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editLocationCall(Location) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.height = "80%"
    dialogConfig.data = {
      location: Location
    }
    this.dialog.open(EditPickupComponent, dialogConfig)
  }


  viewLocationCall(Location) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "800px"
    dialogConfig.data = {
      location: Location
    }
    this.dialog.open(ViewPickupComponent, dialogConfig)
  }

  deleteLocationCall(Location) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      location: Location
    }
    this.dialog.open(DeletePickupComponent, dialogConfig)
  }
}
