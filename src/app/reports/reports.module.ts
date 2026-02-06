import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from "../shared/components/components.module";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { FarmerStatementComponent } from './farmer-statement/farmer-statement.component'; 
import {MatRippleModule} from '@angular/material/core';
import { StatmentComponent } from './pages/statment/statment.component';
import { FarmerProductsReportComponent } from './pages/farmer-products-report/farmer-products-report.component'; 
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
    declarations: [
        MainComponent,
        FarmerStatementComponent,
        StatmentComponent,
        FarmerProductsReportComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
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
        PerfectScrollbarModule,
        MatIconModule,
        MatExpansionModule,
        MatRippleModule,
        MatRadioModule
        
    
    ]
})
export class ReportsModule { }
