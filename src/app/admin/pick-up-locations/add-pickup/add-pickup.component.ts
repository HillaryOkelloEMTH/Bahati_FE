import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SubcountiesService } from '../../sub-counties/subcounties.service';
import { ManagePickupsComponent } from '../manage-pickups/manage-pickups.component';
import { PickupService } from '../pickup.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CollectorsLookupsComponent } from 'src/app/staff/dashboard/look-ups/collectors-lookups/collectors-lookups.component';
import { MilkCollectorsLookupComponent } from '../dialogs/milk-collectors-lookup/milk-collectors-lookup.component';
import { SubCountiesLookupComponent } from '../../sub-counties/sub-counties-lookup/sub-counties-lookup.component';
import { Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-pickup',
  templateUrl: './add-pickup.component.html',
  styleUrls: ['./add-pickup.component.sass'],
})
export class AddPickupComponent extends BaseComponent implements OnInit {
  isLinear = false;
  pickupLocationForm: FormGroup;
  dyForm: FormGroup;
  meetingGeneralDeatilsForm: FormGroup;
  activateLookupCollectors: boolean = true;

  

  routesDataSource!: MatTableDataSource<any>;
  @ViewChild('routesPaginator') routesPaginator!: MatPaginator;
  @ViewChild('routesSort') routesSort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  routesArray: any[] = [];
  routesForm: FormGroup;
  routesDisplayedColumns: string[] = [
    'index',
    'title',
    'actions'
  ];
  agendasLoading: boolean = true;
  agendasNotAdded: boolean = true;
  updateRouteItem: boolean = false;
  agendasIndex: boolean = true;

  collectorsDataSource!: MatTableDataSource<any>;
  @ViewChild('collectorsPaginator', { static: false })
  collectorsPaginator!: MatPaginator;
  @ViewChild('collectorsSort', { static: false }) collectorsSort!: MatSort;
  collectorsForm: FormGroup;
  collectorsDisplayedColumns: string[] = [
    'index',
    'type',
    'actions',
  ];
  collectorsArray: any[] = [];
  collectorsNotAdded: boolean = true;
  collectorsIndex: any;
  updateCollectorsSelected: boolean = false;

  occurrenceIndex: any;

  btnLoading: boolean = false;

  routeIndex: number;

  selection = new SelectionModel<any>(true, []);
  // loading = false;
  addLocationForm: FormGroup;
  dialogData: any;
  milkCollectors = [];
  name: any;
  wards: any;

  displayedColumns: string[] = ['id', 'username', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ManagePickupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private collectionCenterService: PickupService,
    private snackbar: SnackbarService,
    private service: PickupService,
    private wardsService: SubcountiesService,
    private dialog: MatDialog
  ) {
    super();
  }

  // subscription!: Subscription;

  ngOnInit(): void {
    // this.currentUser = this.tokenStorage.getUser();

    // this.username = this.currentUser.username;

    this.pickupLocationForm = this.createPickupLocationForm();

    this.routesForm = this.createRoutesForm();

    this.collectorsForm = this.createCollectorssForm();
  }

  getWards(id: any) {
    this.subscription = this.wardsService.getSubCountyById(id).subscribe(res => {
      this.data = res;

      console.log("Wards ", this.data)
      if (this.data.entity.wards.length > 0) {
        this.wards = this.data.entity.wards;
      }
      else {
      }
    })
  }

  // onSubmit() {
  //   this.loading = true;
  //   this.subscription = this.service.addNewLocation(this.addLocationForm.value).subscribe(res => {
  //     this.loading = false;
  //     this.snackbar.showNotification("snackbar-success", "Successful!");
  //     this.addLocationForm.reset();
  //     this.dialogRef.close();
  //   }, err => {
  //     this.loading = false;MilkCollectorsLookupComponent
  //     this.snackbar.showNotification("snackbar-danger", err);
  //     this.dialogRef.close();
  //   })
  // }

  pickSubCountyDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(SubCountiesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.pickupLocationForm.patchValue({
        subCounty: this.dialogData.data.subcounty,
        subcounty_fk: this.dialogData.data.id
      });

      this.getWards(this.dialogData.data.id);
    });
  }

  // pickRoute(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "40%";
  //   dialogConfig.data = {
  //     user: '',
  //   };
  //   const dialogRef = this.dialog.open(RoutesLookupComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.dialogData = result;
  //     this.addLocationForm.patchValue({
  //       route: this.dialogData.data.route,
  //       route_fk: this.dialogData.data.id
  //     });
  //   });
  // }

  // pickMilkCollectorsDialog(department): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "50%";
  //   dialogConfig.data = {
  //     department: department,
  //   };
  //   const dialogRef = this.dialog.open(LookupMilkCollectorsComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.milkCollectors = result.data;
  //     if (this.milkCollectors.length > 0) {
  //       this.dataSource = new MatTableDataSource<any>(this.milkCollectors);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.addLocationForm.value.collectors = this.milkCollectors;
  //     }
  //   });
  // }

  // onClick() {
  //   this.dialogRef.close();
  // }

  // removeUser(index: any) {
  //   this.milkCollectors.splice(index, 1);
  //   this.dataSource = new MatTableDataSource<any>(this.milkCollectors);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.addLocationForm.value.collectors = this.milkCollectors;
  // }

  createPickupLocationForm(): FormGroup {
    return this.fb.group({
      collectors: new FormArray([]),
      landMark: ['', [Validators.required]],
      name: ['', [Validators.required]],
      routes: new FormArray([]),
      subcounty_fk: ['', [Validators.required]],
      ward_fk: ['', [Validators.required]],
    });
  }

  createRoutesForm(): FormGroup {
    return this.fb.group({
      route: ['', [Validators.required]],
    });
  }

  createCollectorssForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  createMinutesForm(): FormGroup {
    return this.fb.group({
      file: [''],
      fileName: [''],
      fileType: [''],
    });
  }

  milkCollectorsLookup() {
    const dialogRef = this.dialog.open(MilkCollectorsLookupComponent, {
      width: "800px",
      data: {
        action: "Meeting Categories Lookup",
      },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        let collectors: any[] = [];
        collectors = result.data;
        if (collectors.length > 0) {
        

          collectors.forEach((collector) => {

            this.collectorsForm.patchValue({
              username: collector.username,
            });

            this.collectorsArray.push(this.collectorsForm.value);

            this.collectorsForm.reset();
          });

          if (this.collectorsArray.length > 0) {
            this.collectorsNotAdded = false;

            this.getCollectors(this.collectorsArray);

            
          } else {
            this.collectorsNotAdded = true;
          }

          this.collectorsNotAdded = false;
        }

        this.activateLookupCollectors = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  clearMilkCollectors(){
    this.collectorsArray = [];
    this.getCollectors(this.collectorsArray);
    this.collectorsNotAdded = true;

    this.activateLookupCollectors = true;
  }

  /** Form Initialisation Methods End*/


  get f() {
    return this.pickupLocationForm.controls;
  }


  get collectorsFormControl() {
    return this.f.collectors as FormArray;
  }


  get routesFormControl() {
    return this.f.routes as FormArray;
  }


  onRemoveAttendee(i: any) {
    if (i > 0) {
      this.collectorsFormControl.removeAt(i);
    }
  }

  /** Routes Management Begins */
  addRoute() {
    this.routesArray.push(this.routesForm.value);

    if (this.routesArray.length > 0) {
      this.agendasNotAdded = false;
    } else {
      this.agendasNotAdded = true;
    }

    console.log("Routes Array ", this.routesArray)
    this.getRoutes(this.routesArray);

    this.routesForm.reset();
  }

  updateRouteCall(i, data) {
    this.routeIndex = i;

    this.updateRouteItem = true;
    this.routesForm.patchValue({
      route: data.route,
    });
  }

  updateRoute() {
    this.routesArray[this.routeIndex] = this.routesForm.value;

    this.getRoutes(this.routesArray);

    this.routesForm.reset();

    this.updateRouteItem = false;
  }


  removeRoute(i) {
    this.routesArray.splice(i, 1);

    if (this.routesArray.length > 0) {
      this.agendasNotAdded = false;
    } else {
      this.agendasNotAdded = true;
    }

    this.getRoutes(this.routesArray);
  }

  getRoutes(agendasArray: any) {
    this.routesDataSource = new MatTableDataSource(agendasArray);
    this.routesDataSource.paginator = this.routesPaginator;
  }

  /** Routes Management Ends */

 /** Milk Collectors Start */

  removeCollector(index: any) {
    this.collectorsArray.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>(this.collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }
 

  getCollectors(collectorsArray) {
    this.collectorsDataSource = new MatTableDataSource(collectorsArray);
    this.collectorsDataSource.paginator = this.collectorsPaginator;
  }
  
  /** Milk Collectors Ends */



  createCollectionCenter() {
    this.btnLoading = true;

    this.collectorsArray.forEach((collector) => {
      this.collectorsFormControl.push(this.fb.group(collector));
    });

    this.routesArray.forEach((route) => {
      this.routesFormControl.push(this.fb.group(route));
    });


    console.log('Collection Center Form ', this.pickupLocationForm.value);



    this.collectionCenterService.addNewLocation(this.pickupLocationForm.value)
    .subscribe(res => {
      this.btnLoading = false;
      console.log("Response : "+ res)
      this.snackbar.showNotification("snackbar-success", res.message);
      this.pickupLocationForm.reset();
      this.dialogRef.close();
     
        },
        (err) => {
          console.log(err);

          this.btnLoading = false;

          this.snackbar.showNotification(
            "snackbar-danger",
            "Unable to complete the requested operation, an error occurred !"
          );
        }
      );
  }
}
