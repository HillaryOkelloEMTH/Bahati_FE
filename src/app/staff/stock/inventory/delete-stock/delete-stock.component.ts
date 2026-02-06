import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { InventoryManagementComponent } from '../inventory-management/inventory-management.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-delete-stock',
  templateUrl: './delete-stock.component.html',
  styleUrls: ['./delete-stock.component.sass']
})
export class DeleteStockComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InventoryManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: InventoryService) { }

    product: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.product = this.data.stock.name;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteProduct(this.data.stock.id).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
    }, err => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onClick() {
    this.dialogRef.close();
  }

}
