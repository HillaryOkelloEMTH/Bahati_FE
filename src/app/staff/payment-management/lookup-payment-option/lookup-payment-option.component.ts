import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankOption } from '../services/payment-management.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { paymentOption: BankOption }
  ) {
    // Initialize form with empty controls
    this.paymentForm = this.fb.group({
      categoryName: [''],
      code: [''],
      name: [''],
      active: [false],
      createdOn: ['']
    });
  }

  ngOnInit(): void {
  if (this.data && this.data.paymentOption) {
    const createdDateOnly = this.data.paymentOption.createdOn
      ? new Date(this.data.paymentOption.createdOn).toISOString().split('T')[0]
      : '';

    this.paymentForm.patchValue({
      categoryName: this.data.paymentOption.categoryName,
      code: this.data.paymentOption.code,
      name: this.data.paymentOption.name,
      active: this.data.paymentOption.active,
      createdOn: createdDateOnly
    });
  }
}


  close(): void {
    this.dialogRef.close();
  }
}
