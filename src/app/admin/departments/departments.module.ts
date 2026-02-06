import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepartmentsComponent } from './add-departments/add-departments.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { ComponentsModule } from "../../shared/components/components.module";
import { DeletedepartmentComponent } from './deletedepartment/deletedepartment.component';
import { EditdepartmentComponent } from './editdepartment/editdepartment.component';
import { LookupdepartmentsComponent } from './lookupdepartments/lookupdepartments.component';



@NgModule({
    declarations: [
        AddDepartmentsComponent,
        ManageDepartmentsComponent,
        DeletedepartmentComponent,
        EditdepartmentComponent,
        LookupdepartmentsComponent
    ],
    imports: [
        CommonModule,
        DepartmentsRoutingModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableExporterModule,
        SharedModule,
        CommonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
        ComponentsModule
    ]
})
export class DepartmentsModule { }
