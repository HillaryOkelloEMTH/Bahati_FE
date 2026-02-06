import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaymentManagementService, PaymentMode } from '../services/payment-management.service';

@Component({
  selector: 'app-add-payment-option-dialog',
  templateUrl: './add-payment-option-dialog.component.html',
  styleUrls: ['./add-payment-option-dialog.component.sass']
})
export class AddPaymentOptionDialogComponent implements OnInit, OnDestroy {
  addPaymentForm: FormGroup;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddPaymentOptionDialogComponent>,
    private fb: FormBuilder,
    private paymentService: PaymentManagementService
  ) {
    this.addPaymentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      isactive: [true]
    });
  }

  ngOnInit(): void {
    // No need to load categories
  }

  onSubmit(): void {
    if (this.addPaymentForm.valid) {
      this.isLoading = true;

      const formValue = this.addPaymentForm.value;

      const mode: PaymentMode = {
        id: 0, // or leave out if your backend auto-generates it
        active: formValue.isactive,
        name: formValue.name
      };
      

      const sub = this.paymentService.addPaymentMode(mode).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.dialogRef.close(response); // Pass back the created object if needed
        },
        error: (error) => {
          console.error('Error adding payment mode:', error);
          this.isLoading = false;
        }
      });

      this.subscriptions.push(sub);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
