import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { StockCategoriesLookupComponent } from '../../stock-categories/stock-categories-lookup/stock-categories-lookup.component';
import { PickupService } from 'src/app/admin/pick-up-locations/pickup.service';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { ProductsConfigsComponent } from '../products-configs/products-configs.component';
import { ProductLookupComponent } from '../product-lookup/product-lookup.component';
import { ConfigService } from 'src/app/config/config.service';
import { ConfigsService } from '../configs.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-add-product-price',
  templateUrl: './add-product-price.component.html',
  styleUrls: ['./add-product-price.component.sass']
})
export class AddProductPriceComponent implements OnInit {
  priceForm: FormGroup
  mccs: any[] = []
  subscription: Subscription
  loading: boolean = false

  constructor(private fb: FormBuilder, private pickUpService: PickupService, private snackBar: NotificationService,private dialog: MatDialog, public dialogRef: MatDialogRef<ProductsConfigsComponent>, private configService: ConfigsService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initPriceForm();
    this.getMccs()
  }

  initPriceForm(){
    this.priceForm = this.fb.group({
      product: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      mcc: ['', [Validators.required]],
      effectiveFrom: ['', [Validators.required]],
      productId: ['', [Validators.required]]
    })
  }

  selectProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(ProductLookupComponent, dialogConfig,);
    dialogRef.afterClosed().subscribe((result) => {
      this.priceForm.patchValue({
        product: result.data.name,
        productId: result.data.id,
      });
    });
  }

  getMccs() {
    this.subscription = this.pickUpService.getLocations().subscribe({
      next: (res: any) => {
        if (res.entity.length > 0) {
          this.mccs = res.entity
        } else {
          this.mccs = []
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onCancel() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.loading = true;
    const pId = this.priceForm.value.productId
    const mccId = this.priceForm.value.mcc
    const sellingPrice = this.priceForm.value.sellingPrice
    const effectiveFrom = this.datePipe.transform(this.priceForm.value.effectiveFrom, "yyy-MM-dd")

    this.configService.createProductPrice(pId, mccId, sellingPrice, effectiveFrom).subscribe({
      next: (result: any) => {
        this.dialogRef.close()
        this.loading = false
        this.snackBar.alertSuccess(result.message)
      },
      error: (error) => {
        this.dialogRef.close()
        console.log(error)
        this.snackBar.alertWarning(error)
      },
      complete: () => {}
    })
  }

}
