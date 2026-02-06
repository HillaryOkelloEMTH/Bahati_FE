import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockCategoriesRoutingModule } from './stock-categories-routing.module';
import { ManageStockCategoriesComponent } from './manage-stock-categories/manage-stock-categories.component';
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
import { AddStockCategoryComponent } from './add-stock-category/add-stock-category.component';
import { DeleteStockCategoryComponent } from './delete-stock-category/delete-stock-category.component';
import { EditStockCategoryComponent } from './edit-stock-category/edit-stock-category.component';
import { StockCategoriesLookupComponent } from './stock-categories-lookup/stock-categories-lookup.component';


@NgModule({
  declarations: [
    ManageStockCategoriesComponent,
    AddStockCategoryComponent,
    DeleteStockCategoryComponent,
    EditStockCategoryComponent,
    StockCategoriesLookupComponent
  ],
  imports: [
    CommonModule,
    StockCategoriesRoutingModule,
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
export class StockCategoriesModule { }
