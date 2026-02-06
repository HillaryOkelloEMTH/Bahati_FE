import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddMilkCanComponent } from '../add-milk-can/add-milk-can.component';
import { MilkCansService } from '../milk-cans.service';

@Component({
  selector: 'app-edit-milk-can',
  templateUrl: './edit-milk-can.component.html',
  styleUrls: ['./edit-milk-can.component.sass']
})
export class EditMilkCanComponent implements OnInit {

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
      id: [this.data.cans.id],
      canNo: [this.data.cans.canNo, [Validators.required]],
      canName: [this.data.cans.canName, [Validators.required]],
      weight: [this.data.cans.weight, [Validators.required]],
      deductionWeight: [this.data.cans.deductionWeight, [Validators.required]],
    });

  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    this.service.updateCan(this.productsForm.value).subscribe(
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
