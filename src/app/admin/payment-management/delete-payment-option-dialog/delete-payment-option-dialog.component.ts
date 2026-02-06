import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentManagementService } from '../services/payment-management.service';
import { SnackbarService } from '../../../shared/snackbar.service';

@Component({
  selector: 'app-delete-payment-option-dialog',
  templateUrl: './delete-payment-option-dialog.component.html',
})
export class DeletePaymentOptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePaymentOptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string },
    private paymentService: PaymentManagementService,
    private snackbar: SnackbarService
  ) {}

  onDelete(): void {
    if (!this.data.id) {
      console.error('No ID provided for deletion');
      this.snackbar.showNotification('snackbar-danger', 'Missing payment category ID.');
      return;
    }
  
    this.paymentService.deletePaymentMode(this.data.id).subscribe({
      next: () => {
        this.snackbar.showNotification('snackbar-success', 'Payment category deleted successfully.');
        this.dialogRef.close({ deleted: true });
      },
      error: (err) => {
       this.snackbar.showNotification('snackbar-success', 'Payment category deleted successfully.');
        this.dialogRef.close({ deleted: true });
      }
    });
  }
  

  onClose(): void {
    this.dialogRef.close(false);
  }
}
