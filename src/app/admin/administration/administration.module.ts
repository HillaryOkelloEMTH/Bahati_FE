import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { BulkDeliveryComponent } from './bulk-delivery/bulk-delivery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';


@NgModule({
  declarations: [
    BulkDeliveryComponent,
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    NgApexchartsModule,
    ComponentsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class AdministrationModule { }
