import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaymentManagementService, PaymentMode, BankOption, ResponsePayload } from '../services/payment-management.service';

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
  }

  ngOnInit(): void {
    this.addPaymentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      categoryName: ['', [Validators.required]],
      active: [true]
    });

    this.getPaymentOptions()
  }


  getPaymentOptions() {
    this.isLoading = true;
    const modeSub = this.paymentService.getPaymentModes().subscribe({
      next: (modes: ResponsePayload<PaymentMode[]>) => {
        this.categories = modes.entity;
        console.log("Payment modes added....... ", this.categories)
        this.paymentService.getPaymentOptions().subscribe({
          next: (options: BankOption[]) => {
            modes.entity.forEach(mode => {
              const modeOptions = options
                .filter(opt => opt.categoryName === mode.name)
                .map(opt => opt.name)
                .slice(0, 2)
                .join(', ');

                console.log("Mode optiosn that have being retrieved", modes)

              this.categoryExamples[mode.name] = modeOptions || this.getDefaultExample(mode.name);
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

  getDefaultExample(category: string): string {
    switch (category.toUpperCase()) {
      case 'BANK': return 'Equity Bank, KCB Bank';
      case 'MOBILE MONEY': return 'Airtel Money, Telkom';
      case 'CASH': return 'Cash Payment, Petty Cash';
      case 'COOPERATIVE SACCOS': return 'Mwalimu SACCO, Stima SACCO';
      case 'ATM': return 'Visa ATM, Mastercard ATM';
      case 'AUTOMATIC': return 'Auto Debit, Direct Transfer';
      default: return '';
    }
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
