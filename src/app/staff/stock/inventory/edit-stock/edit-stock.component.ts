import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { StockCategoriesLookupComponent } from '../../stock-categories/stock-categories-lookup/stock-categories-lookup.component';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.sass']
})
export class EditStockComponent implements OnInit {

  productsForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: InventoryService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("passed data", this.data); // Fixed: using this.data directly

    this.productsForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      price: [this.data.price, [Validators.required]],
      salePrice: [this.data.salePrice, [Validators.required]],
      stock: [this.data.stock],
      categoryName: [this.data.category],
      priceType: [this.data.priceType],
      type: [this.data.type]
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
    console.log("Submitted form value:", this.productsForm.value);
    this.service.updateProduct(this.data.id, this.productsForm.value).subscribe(
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
