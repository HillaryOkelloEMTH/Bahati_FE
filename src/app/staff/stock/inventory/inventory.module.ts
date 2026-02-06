import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { AddStockComponent } from './add-stock/add-stock.component';
import { DeleteStockComponent } from './delete-stock/delete-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InventoryManagementComponent,
    AddStockComponent,
    EditStockComponent,
    DeleteStockComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
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
    MatTabsModule
  ]
})
export class InventoryModule { }
