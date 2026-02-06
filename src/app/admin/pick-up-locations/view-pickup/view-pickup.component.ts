import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ManagePickupsComponent } from '../manage-pickups/manage-pickups.component';
import { PickupService } from '../pickup.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { SubcountiesService } from '../../sub-counties/subcounties.service';

@Component({
  selector: 'app-view-pickup',
  templateUrl: './view-pickup.component.html',
  styleUrls: ['./view-pickup.component.sass']
})
export class ViewPickupComponent implements OnInit {


  loading = false;
  pickupLocationForm: FormGroup;
  dialogData: any;
  items: MilkCollectors[] = [];
  wards: any;

  displayedColumns: string[] = ["id", "username"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  routesDataSource!: MatTableDataSource<any>;
  @ViewChild('routesPaginator') routesPaginator!: MatPaginator;
  @ViewChild('routesSort') routesSort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  routesArray: any[] = [];
  routesForm: FormGroup;
  routesDisplayedColumns: string[] = ['index', 'id', 'title'];
  agendasLoading: boolean = true;
  agendasNotAdded: boolean = true;
  updateRouteItem: boolean = false;
  agendasIndex: boolean = true;

  collectorsDataSource!: MatTableDataSource<any>;
  @ViewChild('collectorsPaginator', { static: false })
  collectorsPaginator!: MatPaginator;
  @ViewChild('collectorsSort', { static: false }) collectorsSort!: MatSort;
  collectorsForm: FormGroup;
  collectorsDisplayedColumns: string[] = ['index', 'id', 'type'];
  collectorsArray: any[] = [];
  collectorsNotAdded: boolean = true;
  collectorsIndex: any;
  updateCollectorsSelected: boolean = false;

  constructor(public dialogRef: MatDialogRef<ManagePickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private wardsService: SubcountiesService,
    private collectionCenterService: PickupService,) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.pickupLocationForm = this.fb.group({
      name: [this.data.location.name, [Validators.required]],
      subCounty: [this.data.location.subcounty],
      wardName: [this.data.location.ward],
      landMark: [this.data.location.landmark],
    });

    this.getPickupLocationById(this.data.location.id);

    // this.getMilkCollectors();
  }

  getPickupLocationById(collectionId) {
    this.collectionCenterService.getLocationById(collectionId).subscribe(
      (res) => {
        console.log('Pick up location', res);

        this.getWards(res.entity.subcounty_fk);

        this.pickupLocationForm.patchValue({
          id: res.entity.id,
          landMark: res.entity.landMark,
          name: res.entity.name,
          subcounty_fk: res.entity.subcounty_fk,
          ward_fk: res.entity.ward_fk,
        });

        this.collectorsArray = res.entity.collectors;

        if (this.collectorsArray.length > 0) {
          this.collectorsNotAdded = false;
          this.getCollectors(this.collectorsArray);
        } else {
          this.collectorsNotAdded = true;
        }

        this.routesArray = res.entity.routes;

        if (this.routesArray.length > 0) {
          this.agendasNotAdded = false;
          this.getRoutes(this.routesArray);
        } else {
          this.agendasNotAdded = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getWards(id: any) {
    this.subscription = this.wardsService
      .getSubCountyById(id)
      .subscribe((res) => {
        this.data = res;

        console.log('Wards ', this.data);
        if (this.data.entity.wards.length > 0) {
          this.wards = this.data.entity.wards;
        } else {
        }
      });
  }

  getRoutes(agendasArray: any) {
    this.routesDataSource = new MatTableDataSource(agendasArray);
    this.routesDataSource.paginator = this.routesPaginator;
  }

  getCollectors(collectorsArray) {
    this.collectorsDataSource = new MatTableDataSource(collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }

  // getMilkCollectors() {
  //   this.subscription = this.service.getLocationById(this.data.location.id).subscribe(res => {
  //     this.response = res;
  //     this.items = this.response.entity.collectors;
  //     this.dataSource = new MatTableDataSource<any>(this.items);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  onClick() {
    this.dialogRef.close();
  }
}

export class MilkCollectors {
  public username: string;
}
