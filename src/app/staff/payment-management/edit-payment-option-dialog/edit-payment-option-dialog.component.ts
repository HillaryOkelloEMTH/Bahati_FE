
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaymentManagementService, PaymentMode, BankOption } from '../services/payment-management.service';

@Component({
  selector: 'app-edit-payment-option-dialog',
  templateUrl: './edit-payment-option-dialog.component.html',
  styleUrls: ['./edit-payment-option-dialog.component.sass']
})
export class EditPaymentOptionDialogComponent implements OnInit, OnDestroy {
  editPaymentForm!: FormGroup;
  categories: PaymentMode[] = [];
  categoryExamples: { [key: string]: string } = {};
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditPaymentOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { option: BankOption },
    private fb: FormBuilder,
    private paymentService: PaymentManagementService
  ) {}

  ngOnInit(): void {
    this.editPaymentForm = this.fb.group({
      name: [this.data.option?.name || '', [Validators.required, Validators.maxLength(100)]],
      categoryName: [this.data.option?.categoryName || '', Validators.required],
      active: [this.data.option?.active ?? true]
    });

    this.isLoading = true;
    const sub = this.paymentService.getPaymentModes().subscribe({
      next: (modes) => {
        this.categories = modes;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading modes', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.push(sub);
  }

  onSubmit(): void {
    if (this.editPaymentForm.valid) {
      const value = this.editPaymentForm.getRawValue();
      const category = this.categories.find(c => c.name === value.categoryName);
      const updatedOption: BankOption = {
        ...this.data.option,
        name: (value.name || '').toString().trim(),
        active: value.active,
        categoryId: category?.id,
        categoryName: value.categoryName
      };

      this.isLoading = true;
      const sub = this.paymentService.updatePaymentOption(updatedOption).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close(updatedOption); // signal success
        },
        error: (err) => {
          console.error('Error updating option', err);
          this.isLoading = false;
        }
      });
      this.subscriptions.push(sub);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
