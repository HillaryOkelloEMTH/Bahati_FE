import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ManageStockCategoriesComponent } from '../manage-stock-categories/manage-stock-categories.component';
import { StockCategoriesService } from '../stock-categories.service';

@Component({
  selector: 'app-add-stock-category',
  templateUrl: './add-stock-category.component.html',
  styleUrls: ['./add-stock-category.component.sass']
})
export class AddStockCategoryComponent implements OnInit {

  addCategoryForm: FormGroup;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ManageStockCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service: StockCategoriesService) { }
  subscription!: Subscription;


  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    })
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.service.createCategory(this.addCategoryForm.value).subscribe(res => {
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.loading = false;
      this.addCategoryForm.reset();
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
