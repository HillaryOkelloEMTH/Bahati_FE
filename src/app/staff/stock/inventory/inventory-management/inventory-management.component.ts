import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { DeleteStockComponent } from '../delete-stock/delete-stock.component';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { InventoryService } from '../inventory.service';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss']
})
export class InventoryManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'index', 'name', 'price', 'salePrice', 'profit', 'discounted', 'discount', 'stock', 'updateDate'
  ];

  displayedMccColumns: string[] = [
    'id', 'name', 'description', 'salePrice', 'updateOn', 'stock', 'category', 'actions'
  ];

  centerDisplayedColumns: string[] = [
    'name', 'price', 'salePrice', 'category', 'stock'
  ];

  exportColumns: string[] = ['name', 'price', 'salePrice', 'profit', 'discounted', 'discount', 'stock', 'updateDate']

  dataSource = new MatTableDataSource<any>();
  mccProductsDataSource = new MatTableDataSource<any>();
  centersDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('mccPaginator') mccPaginator!: MatPaginator;
  @ViewChild('mccSort') mccSort!: MatSort;
  @ViewChild('centerPaginator') centerPaginator!: MatPaginator;
  @ViewChild('centerSort') centerSort!: MatSort;

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('exporter', { static: false }) exporter: MatTableExporterDirective;
  contextMenuPosition = { x: '0px', y: '0px' };
  selection = new SelectionModel<any>(true, []);

  data: any[] = [];
  mccproducts: any[] = [];
  centers: any[] = [];
  selectedCenter: any = null;

  hasdata = false;
  mccdata = false;
  centerDataAvailable = false;
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private service: InventoryService,
    private pickupService: PickupService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    // Initial binding, then rebinding also happens after data set
    this.bindTableControls();
  }

  private bindTableControls(): void {
    // Safe guard: bind only if defined
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;

    if (this.mccPaginator) this.mccProductsDataSource.paginator = this.mccPaginator;
    if (this.mccSort) this.mccProductsDataSource.sort = this.mccSort;

    if (this.centerPaginator) this.centersDataSource.paginator = this.centerPaginator;
    if (this.centerSort) this.centersDataSource.sort = this.centerSort;
  }

  refresh(): void {
    this.getData();
    this.getCenters();
    this.selectedCenter = null;
    this.mccProductsDataSource.data = [];
  }

  refreshAllocations(): void{
    this.loadMccAllocations(this.selectedCenter.id);
  }

  getData(): void {
    this.isLoading = true;
    this.service.getAllProducts().subscribe({
      next: res => {
        this.data = res.productData || [];
        this.hasdata = this.data.length > 0;
        this.dataSource.data = this.data;

        // Re-bind after data assignment
        setTimeout(() => this.bindTableControls());

        this.isLoading = false;
      },
      error: () => {
        this.hasdata = false;
        this.isLoading = false;
        this.snackBar.open('Failed to load products', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  getCenters(): void {
    this.isLoading = true;
    this.pickupService.getLocations().subscribe({
      next: res => {
        this.centers = res.entity || [];
        this.centerDataAvailable = this.centers.length > 0;
        this.centersDataSource.data = this.centers;

        // Re-bind after data assignment
        setTimeout(() => this.bindTableControls());

        this.isLoading = false;
      },
      error: () => {
        this.centerDataAvailable = false;
        this.isLoading = false;
        this.snackBar.open('Failed to load centers', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  onSelectCenter(center: any): void {
    this.selectedCenter = center;
    this.loadMccAllocations(center.id);
  }

  loadMccAllocations(locationId: number): void {
    this.isLoading = true;
    this.service.getMccAllocations(locationId).subscribe({
      next: res => {
        this.mccproducts = res.productData || [];
        this.mccdata = this.mccproducts.length > 0;
        this.mccProductsDataSource.data = this.mccproducts;

        // Re-bind after data assignment
        setTimeout(() => this.bindTableControls());

        if (!this.mccproducts.length) {
          this.snackBar.open('No allocations found for this center', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }

        this.isLoading = false;
      },
      error: () => {
        this.mccdata = false;
        this.mccProductsDataSource.data = [];
        this.isLoading = false;
        this.snackBar.open('Failed to load allocations', 'Retry', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  mccProductFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.mccProductsDataSource.filter = filterValue;
    this.mccProductsDataSource.paginator?.firstPage();
  }

  centerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.centersDataSource.filter = filterValue;
    this.centersDataSource.paginator?.firstPage();
  }

  goBack(): void {
    this.selectedCenter = null;
    this.mccProductsDataSource.data = [];
    this.getCenters();
  }

  addCall(): void {
    const dialogRef = this.dialog.open(AddStockComponent, { width: '700px', height: '650px' });
    dialogRef.afterClosed().subscribe(() => this.refresh());
  }

  editCall(product: any): void {
    const dialogRef = this.dialog.open(EditStockComponent, { width: '700px', height: '650px', data: product });
    dialogRef.afterClosed().subscribe(result => { if (result) this.refresh(); });
  }

  deleteCall(product: any): void {
    const dialogRef = this.dialog.open(DeleteStockComponent, { width: '500px', data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') this.refresh();
    });
  }

  editProduct(product: any): void { this.editCall(product); }
  deleteProduct(product: any): void { this.deleteCall(product); }
}
