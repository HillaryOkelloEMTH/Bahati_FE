import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentManagementService } from '../services/payment-management.service';
import { SnackbarService } from '../../../shared/snackbar.service';

@Component({
  selector: 'app-delete-payment-option-dialog',
  templateUrl: './delete-payment-option-dialog.component.html',
})
export class DeletePaymentOptionDialogComponent {
  options: any[];

  constructor(
    public dialogRef: MatDialogRef<DeletePaymentOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoryName: string; options: any[] },
    private paymentService: PaymentManagementService, // <-- Use PaymentManagementService here
    private snackbar: SnackbarService
  ) {
    this.options = [...data.options];
  }

  onDeleteOption(option: any): void {
    this.paymentService.deletePaymentOption(option.id).subscribe({
      next: () => {
        this.options = this.options.filter(o => o.id !== option.id);
        this.snackbar.showNotification('snackbar-success', `Deleted: ${option.name}`);

        if (this.options.length === 0) {
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('Delete failed for', option.name, err);
        this.snackbar.showNotification('snackbar-danger', err.message || 'Delete failed');
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
