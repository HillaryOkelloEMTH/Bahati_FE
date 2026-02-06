import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentManagementRoutingModule } from './payment-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { AddPaymentOptionDialogComponent } from './add-payment-option-dialog/add-payment-option-dialog.component';
import { DeletePaymentOptionDialogComponent } from './delete-payment-option-dialog/delete-payment-option-dialog.component';
import { LookupPaymentOptionComponent } from './lookup-payment-option/lookup-payment-option.component';
import { EditPaymentOptionDialogComponent } from './edit-payment-option-dialog/edit-payment-option-dialog.component';

@NgModule({
  declarations: [
    PaymentDetailsComponent,
    AddPaymentOptionDialogComponent,
    DeletePaymentOptionDialogComponent,
    LookupPaymentOptionComponent,
    EditPaymentOptionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentManagementRoutingModule,
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTableExporterModule
  ],
  exports: [
    PaymentDetailsComponent,
    AddPaymentOptionDialogComponent,
    DeletePaymentOptionDialogComponent,
    EditPaymentOptionDialogComponent
  ]
})
export class PaymentManagementModule { }
