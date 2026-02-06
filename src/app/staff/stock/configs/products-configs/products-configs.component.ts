import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddProductConfigComponent } from '../add-product-config/add-product-config.component';
import { ConfigsService } from '../configs.service';
import { DeleteProductConfigComponent } from '../delete-product-config/delete-product-config.component';
import { EditProductConfigComponent } from '../edit-product-config/edit-product-config.component';
import { error } from 'console';
import { AddProductPriceComponent } from '../add-product-price/add-product-price.component';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products-configs',
  templateUrl: './products-configs.component.html',
  styleUrls: ['./products-configs.component.sass']
})
export class ProductsConfigsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "product_name",
    "buying_price",
    // "selling_price",
    "quantity",
    "unit_measurement",
    "route",
    "effective_from",
    "modified_on",
    "actions"
  ];

  displayedPriceColumns: string[] = [
    "id",
    "mcc",
    "product_name",
    "selling_price",
    "buying_price",
    "category",
    "effective_from",
    "actions"
  ];

  pricesDataSource!: MatTableDataSource<any>;
  data: any[] = [];
  mccproducts: any[] = [];
  centers: any[] = [];
  selectedCenter: any = null;
  centersDataSource = new MatTableDataSource<any>();
  hasdata = false;
  mccdata = false;
  centerDataAvailable = false;

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  isLoading = true;
  isdata: boolean;
  pricesdata: boolean = false
  configs: any;
  prices: any

  constructor(
    private service: ConfigsService,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
    private pickupService: PickupService
  ) {
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  @ViewChild('pricePaginator', { static: true }) pricePaginator: MatPaginator;
  @ViewChild('priceSort', { static: true }) priceSort: MatSort;
  @ViewChild('centerPaginator') centerPaginator!: MatPaginator;
  @ViewChild('centerSort') centerSort!: MatSort;

  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getProductPrices();
    this.getCenters()
  }

  refresh() {
    this.getCenters();
  }

  refreshPrices() {
    this.getRoutePrices();
  }


  getRoutePrices() {
    this.service.getRouteConfigs(this.selectedCenter.mcc)
      .subscribe({
        next: (res) => {
          this.configs = res.entity
          if (this.configs.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            this.dataSource = new MatTableDataSource<any>(this.configs);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else {
            this.isLoading = false;
            this.isdata = false;
            this.dataSource = new MatTableDataSource<any>(this.configs);
          }
        },
        error:(error) => {
          this.isLoading = false;
          this.isdata = false;
        }
  });
  }


  getProductPrices(centerId?: number) {
    this.isLoading = true;
    this.service.getProductPrices()
      .subscribe({
        next: (res) => {
          this.prices = res.entity
          if (this.prices.length > 0) {
            this.isLoading = false;
            this.pricesdata = true;
            this.pricesDataSource = new MatTableDataSource<any>(this.prices);
            this.pricesDataSource.paginator = this.pricePaginator;
            this.pricesDataSource.sort = this.priceSort;
          }
          else {
            this.isLoading = false;
            this.pricesdata = false;
            this.pricesDataSource = new MatTableDataSource<any>(this.prices);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.pricesdata = false;
        }
      }
      );
  }

  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      filterType: "route",
      test: ""
    }
    this.dialog.open(AddProductConfigComponent, dialogConfig)
  }

  addCenterConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      filterType: "center",
      test: ""
    }
    this.dialog.open(AddProductConfigComponent, dialogConfig).afterClosed().subscribe({
      next: (res) => {
        this.getCenters()
      }
  })
}

  addPriceDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {},
    this.dialog.open(AddProductPriceComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe({
      next: (res) => {
        this.getProductPrices()
      }
    })
  }


  goBack(): void {
    this.selectedCenter = null;
    this.getCenters();
  }

  getCenters(): void {
    this.isLoading = true;
    this.service.getAllCenterConfigs().subscribe({
      next: (res) => {
        this.centers = res.entity || [];
        this.centerDataAvailable = this.centers.length > 0;
        this.centersDataSource = new MatTableDataSource<any>(this.centers);
        this.centersDataSource.paginator = this.centerPaginator;
          this.centersDataSource.sort = this.centerSort;

        this.isLoading = false;
      },
      error: () => {
        this.centerDataAvailable = false;
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', 'Failed to load centers');
      }
    });
  }

  onSelectCenter(center: any): void {
    this.selectedCenter = center;
    this.getRoutePrices()
  }

  edit(config, filterType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      filterType: filterType,
      configs: config
    }

    this.dialog.open(EditProductConfigComponent, dialogConfig).afterClosed().subscribe({
      next: (res) => {
        this.getCenters()

        if (filterType === "route") {
          this.getRoutePrices()
        } else if (filterType === "center") {
          this.getCenters();
        }
      }
    })
  }

  delete(config) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      configs: config
    }
    this.dialog.open(DeleteProductConfigComponent, dialogConfig)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
