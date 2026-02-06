import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageStockCategoriesComponent } from '../manage-stock-categories/manage-stock-categories.component';
import { StockCategoriesService } from '../stock-categories.service';

@Component({
  selector: 'app-delete-stock-category',
  templateUrl: './delete-stock-category.component.html',
  styleUrls: ['./delete-stock-category.component.sass']
})
export class DeleteStockCategoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageStockCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private service: StockCategoriesService) { }

  category: any;
  subscription!: PushSubscription;
  loading = false;

  ngOnInit(): void {
    this.category = this.data.cats.name + " - " + this.data.cats.description;
  }

  onDelete() {
    this.loading = true;
    this.service.deactivateCategory(this.data.cats.id).subscribe(res => {
      this.loading = false;
      this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
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
