import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AddPaymentOptionDialogComponent } from '../add-payment-option-dialog/add-payment-option-dialog.component';
import { SnackbarService } from '../../../shared/snackbar.service';
import { PaymentMode, PaymentManagementService } from '../services/payment-management.service';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditPaymentOptionDialogComponent } from '../edit-payment-option-dialog/edit-payment-option-dialog.component';
import { LookupPaymentOptionComponent } from '../lookup-payment-option/lookup-payment-option.component';
import { DeletePaymentOptionDialogComponent } from '../delete-payment-option-dialog/delete-payment-option-dialog.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.sass']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  paymentOptions: PaymentMode[] = [];
  optionsDataSource = new MatTableDataSource<PaymentMode>();
  optionColumns: string[] = ['id', 'name', 'active', 'createdAt', 'action'];
  isLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective) exporter?: MatTableExporterDirective;

  constructor(
    private paymentService: PaymentManagementService,
    private snackbar: SnackbarService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadPaymentOptions();
  }

  /**
   * Loads payment options from the service and populates the table.
   * Handles loading state and error notifications.
   */
  loadPaymentOptions(): void {
    this.isLoading = true;
    const sub = this.paymentService.getPaymentModes().subscribe({
      next: (modes: PaymentMode[]) => {
        this.paymentOptions = modes;
        this.optionsDataSource.data = this.paymentOptions;

        setTimeout(() => {
          this.optionsDataSource.paginator = this.paginator;
          this.optionsDataSource.sort = this.sort;
        });
        console.log('Final paymentOptions after conversion:', modes);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching payment modes:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', 'Failed to load payment modes');
      }
    });

    this.subscriptions.push(sub);
  }


  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Calculates the row ID for display in the table.
   * @param index The current row index.
   * @returns The row ID (index + 1).
   */
  getRowId(index: number): number {
    return index + 1;
  }

  /**
   * Applies a filter to the table data based on user input.
   * @param event The keyboard event from the filter input.
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.optionsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.optionsDataSource.paginator) {
      this.optionsDataSource.paginator.firstPage();
    }
  }

  /**
   * Resets the filter form and clears the table filter.
   */
  onFilterChange(): void {
    this.optionsDataSource.filter = '';
    if (this.optionsDataSource.paginator) {
      this.optionsDataSource.paginator.firstPage();
    }
  }

  /**
   * Applies filters from the filter form.
   * This method is currently not functional as filterForm is removed.
   */
  applyFilterForm(): void {
    // This method is currently not functional as filterForm is removed.
    // If filtering by form is needed, re-introduce FormBuilder and filterForm.
    /*
    if (this.filterForm && this.filterForm.valid) {
      const code = this.filterForm.get('code')?.value?.trim().toLowerCase() || '';
      const categoryName = this.filterForm.get('categoryName')?.value?.trim().toLowerCase() || '';

      this.optionsDataSource.filterPredicate = (data: PaymentMode, filter: string) => {
        return (
          data.name.toLowerCase().includes(code)
        );
      };
      this.optionsDataSource.filter = 'filter';
      if (this.optionsDataSource.paginator) {
        this.optionsDataSource.paginator.firstPage();
      }
    }
    */
  }

  /**
   * Opens the dialog to add a new payment option.
   */
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPaymentOptionDialogComponent, {
      width: '500px',
      data: { modes: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPaymentOption(result);
      }
    });
  }

  /**
   * Adds a new payment option via the service.
   * @param modes The PaymentMode object to add.
   */
  addPaymentOption(modes: PaymentMode): void {
    this.isLoading = true;
    const sub = this.paymentService.addPaymentMode(modes).subscribe({
      next: () => {
        this.snackbar.showNotification('snackbar-success', 'Payment mode added successfully');
        this.loadPaymentOptions();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding payment option:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-success', 'Payment mode added successfully');
      }
    });
    this.subscriptions.push(sub);
  }

  /**
   * Toggles the active status of a payment option (true for active, false for inactive).
   * Assumes 'option.active' is a boolean.
   * @param option The PaymentMode object to toggle.
   */
  toggleStatus(option: PaymentMode): void {
    this.isLoading = true;
    const updatedMode = { ...option, active: !option.active };
    const sub = this.paymentService.togglePaymentModeStatus(updatedMode.id).subscribe({
      next: () => {
        this.snackbar.showNotification('snackbar-success', `Payment option ${updatedMode.active ? 'activated' : 'deactivated'} successfully`);
        this.loadPaymentOptions();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error toggling payment option status:', error);
        this.isLoading = false;
        this.snackbar.showNotification('snackbar-danger', error.message || 'Failed to toggle payment option status');
      }
    });
    this.subscriptions.push(sub);
  }






  /**
   * Opens the dialog to view payment option details.
   * @param data The PaymentMode object to lookup.
   */
  lookupPaymentOption(data: PaymentMode): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { paymentOption: data };

    this.dialog.open(LookupPaymentOptionComponent, dialogConfig);
  }

  /**
   * Opens the dialog to edit an existing payment option.
   * @param mode The PaymentMode object to edit.
   */
  editOption(mode: PaymentMode): void {
    const dialogRef = this.dialog.open(EditPaymentOptionDialogComponent, {
      width: '500px',
      data: {
        mode: {
          id: mode.id,
          name: mode.name,
          active: mode.active // Pass the boolean active status
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackbar.showNotification('snackbar-success', 'Payment option updated');
        this.loadPaymentOptions();
      }
    });
  }

  /**
   * Opens the dialog to confirm deletion of a payment option.
   * @param id The ID of the payment option to delete.
   * @param name The name of the payment option to delete (for display in dialog).
   */
  openDeleteDialog(id: number, name: string): void {
    console.log('Opening delete dialog with:', { id, name });

    const dialogRef = this.dialog.open(DeletePaymentOptionDialogComponent, {
      width: '500px',
      data: {
        id: id,
        categoryName: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.deleted) {
        this.snackbar.showNotification('snackbar-success', 'Payment option deleted');
        this.loadPaymentOptions();
      }
    });
  }



}
