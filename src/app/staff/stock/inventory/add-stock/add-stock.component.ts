import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { StockCategoriesLookupComponent } from '../../stock-categories/stock-categories-lookup/stock-categories-lookup.component';
import { InventoryManagementComponent } from '../inventory-management/inventory-management.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.sass']
})
export class AddStockComponent implements OnInit {

  productsForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: InventoryService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<InventoryManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      type: ["", [Validators.required]],
      category: ["", [Validators.required]],
      price: ["", [Validators.required]],
      salePrice: ["", [Validators.required]],
      stock: [""],
      categoryName: [""],
      priceType: ["", [Validators.required]]
    });

  }

  pickCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(StockCategoriesLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.productsForm.patchValue({
        category: result.data.id,
        categoryName: result.data.name,
      });
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    this.service.createProduct(this.productsForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-success", "Successful!");
        this.productsForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }
}
