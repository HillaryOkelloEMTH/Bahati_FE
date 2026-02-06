import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsConfigsComponent } from './products-configs/products-configs.component';
import { AddProductConfigComponent } from './add-product-config/add-product-config.component';
import { EditProductConfigComponent } from './edit-product-config/edit-product-config.component';
import { DeleteProductConfigComponent } from './delete-product-config/delete-product-config.component';
import { AddProductPriceComponent } from './add-product-price/add-product-price.component';
import { ProductLookupComponent } from './product-lookup/product-lookup.component';
import { UpdateConfirmationComponent } from './update-confirmation/update-confirmation.component';


@NgModule({
  declarations: [
    ProductsConfigsComponent,
    AddProductConfigComponent,
    EditProductConfigComponent,
    DeleteProductConfigComponent,
    AddProductPriceComponent,
    ProductLookupComponent,
    UpdateConfirmationComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class ConfigsModule { }
