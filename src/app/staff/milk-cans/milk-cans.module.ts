import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilkCansRoutingModule } from './milk-cans-routing.module';
import { ManageMilkCansComponent } from './manage-milk-cans/manage-milk-cans.component';
import { AddMilkCanComponent } from './add-milk-can/add-milk-can.component';
import { EditMilkCanComponent } from './edit-milk-can/edit-milk-can.component';
import { DeleteMilkCanComponent } from './delete-milk-can/delete-milk-can.component';
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


@NgModule({
  declarations: [
    ManageMilkCansComponent,
    AddMilkCanComponent,
    EditMilkCanComponent,
    DeleteMilkCanComponent
  ],
  imports: [
    CommonModule,
    MilkCansRoutingModule,
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
    MatSelectModule
  ]
})
export class MilkCansModule { }
