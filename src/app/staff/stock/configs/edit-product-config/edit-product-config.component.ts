import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
// import { UseraccountsComponent } from 'src/app/admin/users/useraccounts/useraccounts.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigsService } from '../configs.service';
import { ProductsConfigsComponent } from '../products-configs/products-configs.component';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { read } from 'fs';
import { UpdateConfirmationComponent } from '../update-confirmation/update-confirmation.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-product-config',
  templateUrl: './edit-product-config.component.html',
  styleUrls: ['./edit-product-config.component.sass']
})
export class EditProductConfigComponent extends BaseComponent implements OnInit {

  configsForm: FormGroup;
  loading = false;
  routes: any[] = [];
  mccs: any[] = []
  productConfig:any
  filterType: any
  message: string = ""

  constructor(
    private fb: FormBuilder,
    private service: ConfigsService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductsConfigsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pickupService: PickupService,
    private datePipe: DatePipe
  ) {
    super()
  }

  ngOnInit(): void {
    let productId = this.data.configs.id
    this.filterType = this.data.filterType || ''
    console.log("The filter type is "+this.filterType)
    this.configsForm = this.fb.group({
        id: ['', [Validators.required]],
        productName: ['Fresh Milk', [Validators.required]],
        buyingPrice: ['', [Validators.required]],
        sellingPrice: ['', [Validators.required]],
        unitMeasurement: ['Kgs', [Validators.required]],
        quantity: ['1', [Validators.required]],
        effectiveFrom: ['', [Validators.required]],
        routeFk: ['', [Validators.required]],
        mccFk: ['', [Validators.required]],
    });

    this.service.getConfigsById(productId).subscribe(res => {
      this.data = res;
      this.loading = false;
      this.productConfig = this.data.entity
      this.patchValues()
      console.log("Product Config details ", this.data.entity)
    })

    this.validateForm()

    this.getRoutes();
    this.getMccs();
    }

  getRoutes(){
      this.service.getRoutes().pipe(takeUntil(this.subject)).subscribe(res => {
        let routes = res.entity;

        if (routes.length > 0) {
          this.routes = routes;
          this.configsForm.get('routeFk')?.disable()
        }
      }, err => {
        console.log(err)
      })
  }


  getMccs() {
    this.pickupService.getLocations().subscribe({
      next: (res: any) => {
        if (res.entity.length > 0) {
          this.mccs = res.entity
          this.configsForm.get('mccFk')?.disable()
        } else {
          this.mccs = []
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  validateForm() {
    if (this.data.filterType === "center") {
      this.configsForm.get('routeFk')?.clearValidators()
    } else if (this.data.filterType === "route") {
      this.configsForm.get('mccFk')?.clearValidators()
    }
  }


  onCancel() {
      this.dialogRef.close();
  }

  patchValues() {
    this.configsForm.patchValue({
      id: this.productConfig.id,
      productName: this.productConfig.productName,
      buyingPrice: this.productConfig.buyingPrice,
      sellingPrice: this.productConfig.sellingPrice,
      unitMeasurement: this.productConfig.unitMeasurement,
      quantity: this.productConfig.quantity,
      effectiveFrom: this.productConfig.effectiveFrom,
      routeFk: this.productConfig.routeFk,
      mccFk: this.productConfig.mccFk,
    });
  }

  onSubmit() {
      this.loading = true;
      this.configsForm.value.effectiveFrom = this.datePipe.transform(this.configsForm.value.effectiveFrom, 'yyyy-MM-dd');
      this.service.updateConfiguration(this.configsForm.value, this.filterType).subscribe({
        next: (res) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-success", "Successful!");
          this.configsForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }});
  }

  checkEffectiveDate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"

    const effectiveFrom = this.configsForm.get('effectiveFrom')?.value;
    const now = new Date();
    const selectedDate = new Date(effectiveFrom);

    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Previous month check
    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth)
    ) {
      return this.openConfirmationDialog('Warn Past Month', 'You are trying to update a configuration for a past month. Are you sure you want to proceed?');
    }

    // Today or earlier in current month
    if (
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      selectedDate.getDate() < now.getDate()
    ) {
      return this.openConfirmationDialog('Warn Past Day', 'You are trying to update a configuration for a past date. Are you sure you want to proceed?');
    }

    // Mid-month (not the 1st)
    if (
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      selectedDate.getDate() > 1
    ) {
      return this.openConfirmationDialog(
        'Mid-Month Update', 'Are you sure you want to update the configuration for this product mid-month? This may affect current allocations.')
    }
  }

  openConfirmationDialog(title, message) {
    this.dialog.open(UpdateConfirmationComponent, {
        width: '600px',
        data: {
          title: title,
          message: message
        }
    }).afterClosed().subscribe({
      next: (result) => {
        if (title === 'Warn Past Month') {
          this.dialogRef.close()
        } else if (result && result.action === 'update') {
          this.onSubmit()
        }
      }
    })
  }
}

