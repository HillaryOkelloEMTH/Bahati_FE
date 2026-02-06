import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ConfigsService } from '../configs.service';
import { ProductsConfigsComponent } from '../products-configs/products-configs.component';

@Component({
  selector: 'app-delete-product-config',
  templateUrl: './delete-product-config.component.html',
  styleUrls: ['./delete-product-config.component.sass']
})
export class DeleteProductConfigComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductsConfigsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: ConfigsService) { }

  item: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.item = this.data.configs.productName;
  }

  onDelete() {
    this.loading = true;
    this.subscription = this.service.deleteConfiguration(this.data.configs.id).subscribe(res => {
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
