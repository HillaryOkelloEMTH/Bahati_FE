import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { AddRouteComponent } from './add-route/add-route.component';
import { DeleteRouteComponent } from './delete-route/delete-route.component';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { ManageRoutesComponent } from './manage-routes/manage-routes.component';
import { RoutesLookupComponent } from './routes-lookup/routes-lookup.component';

@NgModule({
  declarations: [ManageRoutesComponent, AddRouteComponent, EditRouteComponent, DeleteRouteComponent, RoutesLookupComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class RoutesModule { }
