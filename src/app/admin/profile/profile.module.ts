import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { CreateBusinessProfileComponent } from './create-business-profile/create-business-profile.component';
import { EditBusinessProfileComponent } from './edit-business-profile/edit-business-profile.component';


@NgModule({
  declarations: [BusinessProfileComponent, CreateBusinessProfileComponent, EditBusinessProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ]
})
export class ProfileModule { }
