import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcountiesRoutingModule } from './subcounties-routing.module';
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
import { ManageSubCountiesComponent } from './manage-sub-counties/manage-sub-counties.component';
import { DeleteSubcountyComponent } from './delete-subcounty/delete-subcounty.component';
import { EditSubcountyComponent } from './edit-subcounty/edit-subcounty.component';
import { AddSubcountyComponent } from './add-subcounty/add-subcounty.component';
import { ViewSubcountyComponent } from './view-subcounty/view-subcounty.component';
import { SubCountiesLookupComponent } from './sub-counties-lookup/sub-counties-lookup.component';
import { WardsLookupComponent } from './wards-lookup/wards-lookup.component';


@NgModule({
  declarations: [
    ManageSubCountiesComponent,
    DeleteSubcountyComponent,
    EditSubcountyComponent,
    AddSubcountyComponent,
    ViewSubcountyComponent,
    SubCountiesLookupComponent,
    WardsLookupComponent
  ],
  imports: [
    CommonModule,
    SubcountiesRoutingModule,
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
export class SubcountiesModule { }
