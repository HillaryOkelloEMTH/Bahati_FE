import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaymentManagementService, PaymentMode} from '../services/payment-management.service';

@Component({
  selector: 'app-edit-payment-option-dialog',
  templateUrl: './edit-payment-option-dialog.component.html',
  styleUrls: ['./edit-payment-option-dialog.component.sass']
})
export class EditPaymentOptionDialogComponent implements OnInit, OnDestroy {
  editPaymentForm!: FormGroup;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditPaymentOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: PaymentMode },
    private fb: FormBuilder,
    private paymentService: PaymentManagementService
  ) {}

  ngOnInit(): void {
    this.editPaymentForm = this.fb.group({
      name: [this.data.mode.name || '', [Validators.required, Validators.maxLength(100)]],
      active: [this.data.mode?.active ?? true],
      createdAt: [this.data.mode.createdAt || '']
    });
  }
  onSubmit(): void {
  if (this.editPaymentForm.valid && this.data?.mode?.id) {
    const updatedPaymentMode: PaymentMode = {
      id: this.data.mode.id,
      name: this.editPaymentForm.value.name,
      createdAt:this.editPaymentForm.value.createdAt,
      active: this.editPaymentForm.value.active
    };

    this.isLoading = true;

    this.paymentService.updatePaymentMode(updatedPaymentMode).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Update failed', error);
      }
    });
  } else {
    console.error('Form is invalid or missing mode ID');
  }
}

  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
