import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MilkCansService } from '../milk-cans.service';

@Component({
  selector: 'app-add-milk-can',
  templateUrl: './add-milk-can.component.html',
  styleUrls: ['./add-milk-can.component.sass']
})
export class AddMilkCanComponent implements OnInit {

  productsForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: MilkCansService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMilkCanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      canNo: ["", [Validators.required]],
      canName: ["", [Validators.required]],
      weight: ["", [Validators.required]],
      deductionWeight: ["", [Validators.required]],
    });

  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    this.service.createCan(this.productsForm.value).subscribe(
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
