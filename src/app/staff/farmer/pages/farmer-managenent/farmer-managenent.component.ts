import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FarmerCounts, FarmerService } from '../../services/farmer.service';
import { DeleteFarmerComponent } from '../delete-farmer/delete-farmer.component';
import { FarmerDetailsComponent } from '../farmer-details/farmer-details.component';
import { RegisterFarmerComponent } from '../register-farmer/register-farmer.component';
import { UpdateFarmerComponent } from '../update-farmer/update-farmer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RoutesLookUpComponent } from 'src/app/staff/sales/pages/routes-look-up/routes-look-up.component';
import { LookupPickUpLocationsComponent } from 'src/app/staff/sales/pages/lookup-pick-up-locations/lookup-pick-up-locations.component';

@Component({
  selector: 'app-farmer-managenent',
  templateUrl: './farmer-managenent.component.html',
  styleUrls: ['./farmer-managenent.component.sass']
})
export class FarmerManagenentComponent implements OnInit {
  filterform: FormGroup;
  selected = 'all';

  displayedColumns: string[] = [
    'farmer_no',
    'username',
    'mobile_no',
    'id_number',
    'route',
    'pickUpLocation',
    'action'
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  countsLoading: boolean = false;
  farmerCounts: FarmerCounts | null = null;

  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private service: FarmerService,
    private fb: FormBuilder
  ) {}

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(): void {
    this.filterform = this.fb.group({
      farmer_no: [''],
      route: [''],
      routeId: [''],
      pickUpLocation: [''],
      pickUpLocationId: [''],
      month: ['', [Validators.min(1), Validators.max(12)]]
    });

    // Subscribe to farmer_no changes
    this.filterform.get('farmer_no')?.valueChanges.subscribe(() => {
      if (this.selected === 'fn') {
        this.filterFarmers();
      }
    });

    // Subscribe to routeId changes
    this.filterform.get('routeId')?.valueChanges.subscribe(() => {
      if (this.selected === 'route' && this.filterform.get('month')?.valid) {
        this.filterFarmers();
      } else if (this.selected === 'route') {
        this.snackbar.showNotification('error', 'Please enter a valid month (1-12)');
      }
    });

    // Subscribe to pickUpLocationId changes
    this.filterform.get('pickUpLocationId')?.valueChanges.subscribe(() => {
      if (this.selected === 'PickUpLocationId' && this.filterform.get('month')?.valid) {
        this.filterFarmers();
      } else if (this.selected === 'PickUpLocationId') {
        this.snackbar.showNotification('error', 'Please enter a valid month (1-12)');
      }
    });

    // Fetch all farmers on page load
    this.getData();
    this.getFarmerCounts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    onFilterChange(): void {
      this.filterform.reset({ month: this.filterform.get('month')?.value });
      this.filterFarmers();
    }

    filterButtonClicked(): void {
      this.filterFarmers();
    }

    getFarmerCounts(): void {
      this.countsLoading = true;
      this.service.getFarmerCounts().subscribe({
        next: (res) => {
          this.farmerCounts = res.entity;
          this.countsLoading = false;
        },
        error: (error) => {
          console.error('Error fetching farmer counts:', error);
          this.countsLoading = false;
          this.snackbar.showNotification('error', 'Failed to fetch farmer counts');
        }
      });
    }



  getData(): void {
    this.selected = 'all';
    this.isLoading = true;
    this.subscription = this.service.getFarmers().subscribe({
      next: (res) => {
        this.data = res;
        if (res.entity?.length > 0) {
          const mappedData = res.entity.map((farmer: any) => ({
            id: farmer.id || farmer.farmerId || '',
            farmer_no: farmer.farmerNo || farmer.farmer_no || '',
            username: farmer.username || farmer.name || '',
            mobile_no: farmer.mobileNo || farmer.mobile_no || '',
            id_number: farmer.idNumber || farmer.id_number || '',
            route: farmer.routeName || farmer.route || '',
            pickUpLocation: farmer.pickUpLocationName || farmer.pickUpLocation || farmer.location || ''
          }));
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource(mappedData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource([]);
          this.snackbar.showNotification('error', 'No farmers found');
        }
      },
      error: (error) => {
        console.error('Error fetching farmers:', error);
        this.isLoading = false;
        this.snackbar.showNotification('error', 'Failed to fetch farmers');
      }
    });
  }

  selectRoute(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { data: '' };

    const dialogRef = this.dialog.open(RoutesLookUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Route dialog result:', JSON.stringify(result, null, 2));
      if (result) {
        const routeData = result.data || result;
        const routeName = routeData.name || routeData.routeName || routeData.route_name || routeData.displayName || routeData.route || '';
        const routeId = routeData.id || routeData.routeId || routeData.id_number || routeData.route_id || '';
        this.filterform.patchValue({
          route: routeName,
          routeId: routeId
        });
        console.log('Patched filterform:', this.filterform.value);
        if (this.selected === 'route' && this.filterform.get('month')?.valid) {
          this.filterFarmers();
        } else if (this.selected === 'route') {
          this.snackbar.showNotification('error', 'Please enter a valid month (1-12)');
        }
      }
    });
  }

  selectPickUpLocation(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { data: '' };

    const dialogRef = this.dialog.open(LookupPickUpLocationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('PickUpLocation dialog result:', JSON.stringify(result, null, 2));
      if (result) {
        const locationData = result.data || result;
        const locationName = locationData.name || locationData.locationName || locationData.location_name || locationData.displayName || '';
        const locationId = locationData.id || locationData.locationId || locationData.id_number || locationData.location_id || '';
        this.filterform.patchValue({
          pickUpLocation: locationName,
          pickUpLocationId: locationId
        });
        if (this.selected === 'PickUpLocationId' && this.filterform.get('month')?.valid) {
          this.filterFarmers();
        } else if (this.selected === 'PickUpLocationId') {
          this.snackbar.showNotification('error', 'Please enter a valid month (1-12)');
        }
      }
    });
  }

  filterFarmers(): void {
    if (this.selected === 'fn') {
      this.getByFarmersByFarmerNo();
    } else if (this.selected === 'route') {
      this.filterByRoute();
    } else if (this.selected === 'PickUpLocationId') {
      this.filterByPickUpLocation();
    } else {
      this.getData();
    }
  }

  private getByFarmersByFarmerNo(): void {
    this.isLoading = true;
    const farmerNo = this.filterform.value.farmer_no;

    if (farmerNo) {
      this.subscription = this.service.getByFarmersByFarmerNo(farmerNo).subscribe({
        next: (res) => {
          console.log('getByFarmersByFarmerNo response:', JSON.stringify(res, null, 2));
          this.data = res;
          if (res.entity) {
            const result = [{
              farmer_no: res.entity.farmerNo || res.entity.farmer_no || '',
              username: res.entity.username || res.entity.name || '',
              mobile_no: res.entity.mobileNo || res.entity.mobile_no || '',
              id_number: res.entity.idNumber || res.entity.id_number || '',
              route: res.entity.routeName || res.entity.route || '',
              pickUpLocation: res.entity.pickUpLocationName || res.entity.pickUpLocation || res.entity.location || ''
            }];
            this.isLoading = false;
            this.isdata = true;
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isdata = false;
            this.isLoading = false;
            this.dataSource = new MatTableDataSource([]);
            this.snackbar.showNotification('error', 'No farmer found with the provided number');
          }
        },
        error: (error) => {
          console.error('Error fetching farmer by number:', error);
          this.isLoading = false;
          this.snackbar.showNotification('error', 'Failed to fetch farmer data');
        }
      });
    } else {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource([]);
      this.isdata = false;
    }
  }

  private filterByRoute(): void {
  const routeId = this.filterform.value.routeId;
  const monthControl = this.filterform.get('month');
  const month = monthControl?.value ? parseInt(monthControl.value, 10) : null;

  if (!routeId) {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource([]);
    this.isdata = false;
    this.snackbar.showNotification('error', 'Please select a route');
    return;
  }

  this.isLoading = true;

  this.subscription = this.service.getRouteActiveFarmers(routeId, month).subscribe({
    next: (res) => {
      console.log('filterByRoute response:', JSON.stringify(res, null, 2));
      this.data = res;
      if (res.entity?.length > 0) {
        const mappedData = res.entity.map((farmer: any) => ({
          farmer_no: farmer.farmerNo || farmer.farmer_no || '',
          username: farmer.username || farmer.name || '',
          mobile_no: farmer.mobileNo || farmer.mobile_no || '',
          id_number: farmer.idNumber || farmer.id_number || '',
          route: farmer.routeName || farmer.route || '',
          pickUpLocation: farmer.pickUpLocationName || farmer.pickUpLocation || farmer.location || ''
        }));
        this.isLoading = false;
        this.isdata = true;
        this.dataSource = new MatTableDataSource(mappedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource([]);
        this.snackbar.showNotification('error', 'No farmers found for the selected route');
      }
    },
    error: (error) => {
      console.error('Error fetching farmers by route:', error);
      this.isLoading = false;
      this.snackbar.showNotification('error', 'Failed to fetch farmers by route');
    }
  });
}

  private filterByPickUpLocation(): void {
  const locationId = this.filterform.value.pickUpLocationId;
  const monthControl = this.filterform.get('month');
  const month = monthControl?.value ? parseInt(monthControl.value, 10) : null;

  if (!locationId) {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource([]);
    this.isdata = false;
    this.snackbar.showNotification('error', 'Please select a pick-up location');
    return;
  }

  this.isLoading = true;

  this.subscription = this.service.getCenterActiveFarmers(locationId, month).subscribe({
    next: (res) => {
      console.log('filterByPickUpLocation response:', JSON.stringify(res, null, 2));
      this.data = res;
      if (res.entity?.length > 0) {
        const mappedData = res.entity.map((farmer: any) => ({
          farmer_no: farmer.farmerNo || farmer.farmer_no || '',
          username: farmer.username || farmer.name || '',
          mobile_no: farmer.mobileNo || farmer.mobile_no || '',
          id_number: farmer.idNumber || farmer.id_number || '',
          route: farmer.routeName || farmer.route || '',
          pickUpLocation: farmer.pickUpLocationName || farmer.pickUpLocation || farmer.location || ''
        }));
        this.isLoading = false;
        this.isdata = true;
        this.dataSource = new MatTableDataSource(mappedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.isdata = false;
        this.isLoading = false;
        this.dataSource = new MatTableDataSource([]);
        this.snackbar.showNotification('error', 'No farmers found for the selected pick-up location');
      }
    },
    error: (error) => {
      console.error('Error fetching farmers by pick-up location:', error);
      this.isLoading = false;
      this.snackbar.showNotification('error', 'Failed to fetch farmers by pick-up location');
    }
  });
}


  addCall(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    dialogConfig.data = { test: '' };
    this.dialog.open(RegisterFarmerComponent, dialogConfig);
  }

  viewFarmerDetails(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    dialogConfig.data = { farmer: data };
    this.dialog.open(FarmerDetailsComponent, dialogConfig);
  }

  editCall(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    dialogConfig.data = { farmer: data };
    this.dialog.open(UpdateFarmerComponent, dialogConfig).afterClosed().subscribe({
      next: (res) => {
        this.getData()
      },
      error: (error) => {},
      complete: () => {}
    });
  }

  deleteCall(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { farmer: data };
    this.dialog.open(DeleteFarmerComponent, dialogConfig);
  }

  viewFarmerCollections(row: any): void {
    this.router.navigate(['/staff/sales/farmer', row.farmer_no]);
  }

  farmerDetailsCall(row: any): void {
    this.viewFarmerDetails(row);
  }
}
