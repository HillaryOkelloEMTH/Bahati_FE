import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsRoutingModule } from './sms-routing.module';
import { SmsManagementComponent } from './sms-management/sms-management.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { BulkComponent } from './bulk/bulk.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SmsLimitsComponent } from './sms-limits/sms-limits.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { DeleteTemplateComponent } from './delete-template/delete-template.component';
import { ViewTemplateBodyComponent } from './view-template-body/view-template-body.component';
import { InitiateBulkSmsComponent } from './initiate-bulk-sms/initiate-bulk-sms.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    SmsManagementComponent,
    SendSmsComponent,
    BulkComponent,
    SmsTemplateComponent,
    SmsLimitsComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    DeleteTemplateComponent,
    ViewTemplateBodyComponent,
    InitiateBulkSmsComponent
  ],
  imports: [
    CommonModule,
    SmsRoutingModule,
    SharedModule,
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
    MatCheckboxModule,
    MatProgressBarModule

  ]
})
export class SmsModule { }
