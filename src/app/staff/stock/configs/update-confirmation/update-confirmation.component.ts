import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditProductConfigComponent } from '../edit-product-config/edit-product-config.component';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.sass']
})
export class UpdateConfirmationComponent implements OnInit {
loading: boolean = false;
title: any
message: any
constructor(private dialogRef: MatDialogRef<EditProductConfigComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit(): void {
  this.title = this.data.title
  this.message = this.data.message
  }

  onSubmit() {
    this.dialogRef.close({ action: 'update' });
  }

  onCancel() {
    this.dialogRef.close({action: 'cancel' });
  }

}
