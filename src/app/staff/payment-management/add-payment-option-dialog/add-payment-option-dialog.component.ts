import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaymentManagementService, PaymentMode, BankOption } from '../services/payment-management.service';

@Component({
  selector: 'app-add-payment-option-dialog',
  templateUrl: './add-payment-option-dialog.component.html',
  styleUrls: ['./add-payment-option-dialog.component.sass']
})
export class AddPaymentOptionDialogComponent implements OnInit, OnDestroy {
  addPaymentForm: FormGroup;
  categories: PaymentMode[] = [];
  categoryExamples: { [key: string]: string } = {};
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddPaymentOptionDialogComponent>,
    private fb: FormBuilder,
    private paymentService: PaymentManagementService
  ) {
    this.addPaymentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      categoryName: ['', [Validators.required]],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    const modeSub = this.paymentService.getPaymentModes().subscribe({
      next: (modes: PaymentMode[]) => {
        this.categories = modes;
        this.paymentService.getPaymentOptions().subscribe({
          next: (options: BankOption[]) => {
            modes.forEach(mode => {
              const modeOptions = options
                .filter(opt => opt.categoryName === mode.name)
                .map(opt => opt.name)
                .slice(0, 2)
                .join(', ');
              this.categoryExamples[mode.name] = modeOptions;
            });
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching payment options:', error);
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching payment modes:', error);
        this.isLoading = false;
      }
    });
    this.subscriptions.push(modeSub);
  }

 

  onSubmit(): void {
    if (this.addPaymentForm.valid) {
      this.isLoading = true;
      const formValue = this.addPaymentForm.getRawValue();
      const selectedCategory = this.categories.find(c => c.name === formValue.categoryName);

      const newOption: BankOption = {
        id: 0, // usually backend generates ID
        name: formValue.name.trim(),
        categoryId: selectedCategory?.id,
        categoryName: formValue.categoryName,
        active: formValue.active,
        createdOn: new Date().toISOString(),
        code: ''
      };

      const sub = this.paymentService.addPaymentOption(newOption).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close(newOption); // close dialog and return the added option
        },
        error: (error) => {
          console.error('Error adding payment option:', error);
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
