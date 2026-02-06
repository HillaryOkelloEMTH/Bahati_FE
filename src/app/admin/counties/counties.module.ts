import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountiesRoutingModule } from './counties-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCountyComponent } from './add-county/add-county.component';
import { DeleteCountyComponent } from './delete-county/delete-county.component';
import { EditCountyComponent } from './edit-county/edit-county.component';
import { ManageCountiesComponent } from './manage-counties/manage-counties.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountiesLookupComponent } from './counties-lookup/counties-lookup.component';


@NgModule({
  declarations: [
    ManageCountiesComponent,
    EditCountyComponent,
    AddCountyComponent,
    DeleteCountyComponent,
    CountiesLookupComponent
  ],
  imports: [
    CountiesRoutingModule,
    CommonModule,
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
export class CountiesModule { }
