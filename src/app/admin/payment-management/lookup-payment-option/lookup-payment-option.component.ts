import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankOption,PaymentMode } from '../services/payment-management.service';

@Component({
  selector: 'app-lookup-payment-option',
  templateUrl: './lookup-payment-option.component.html',
  styleUrls: ['./lookup-payment-option.component.sass']
})
export class LookupPaymentOptionComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LookupPaymentOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paymentOption: PaymentMode }
  ) {
    // Define form controls matching patch values
    this.paymentForm = this.fb.group({
      name: [''],
      active: [true],
      createdAt: ['']
    });
  }

  ngOnInit(): void {
    if (this.data?.paymentOption) {
      const createdDateOnly = this.data.paymentOption.createdAt
        ? new Date(this.data.paymentOption.createdAt).toISOString().split('T')[0]
        : '';

      this.paymentForm.patchValue({
        name: this.data.paymentOption.name,
        active: this.data.paymentOption.active,
        createdAt: createdDateOnly
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
