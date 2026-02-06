import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesManagenentComponent } from './pages/sales-managenent/sales-managenent.component';
import { ComponentsModule } from "../../shared/components/components.module";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CollectionsComponent } from './pages/collections/collections.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollectionsPerCollectorsComponent } from './pages/collections-per-collectors/collections-per-collectors.component';
import { CollectorsFloatAllocationsComponent } from './pages/collectors-float-allocations/collectors-float-allocations.component';
import { FloatAllocationComponent } from './pages/float-allocation/float-allocation.component';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { EditFloatAllocationComponent } from './pages/edit-float-allocation/edit-float-allocation.component';
import { DeleteFloatAllocationComponent } from './pages/delete-float-allocation/delete-float-allocation.component';
import { LookupOneMilkcollectorComponent } from './pages/lookup-one-milkcollector/lookup-one-milkcollector.component';
import { ProductsAllocationComponent } from './pages/products-allocation/products-allocation.component';
import { AddAllocationComponent } from './pages/add-allocation/add-allocation.component';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkColumnDef } from '@angular/cdk/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule as chartjsModule } from "ng2-charts";
import { EditCollectionComponent } from './pages/edit-collection/edit-collection.component';
import { LookupPickUpLocationsComponent } from './pages/lookup-pick-up-locations/lookup-pick-up-locations.component';
import { RoutesLookUpComponent } from './pages/routes-look-up/routes-look-up.component';
import { VerifyproductAllocationsComponent } from './verifyproduct-allocations/verifyproduct-allocations.component';
import { ReturnDeliveryComponent } from './pages/return-delivery/return-delivery.component';


@NgModule({
    declarations: [
        SalesManagenentComponent,
        CollectionsComponent,
        CollectionsPerCollectorsComponent,
        CollectorsFloatAllocationsComponent,
        FloatAllocationComponent,
        CollectionDetailsComponent,
        EditFloatAllocationComponent,
        DeleteFloatAllocationComponent,
        LookupOneMilkcollectorComponent,
        ProductsAllocationComponent,
        AddAllocationComponent,
        EditCollectionComponent,
        LookupPickUpLocationsComponent,
        RoutesLookUpComponent,
        VerifyproductAllocationsComponent,
        ReturnDeliveryComponent,
    ],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCtDO1QdXGeEnX5LA1qOQlpuChPkZJJb1I'
        }),
        SalesRoutingModule,
        SharedModule,
        NgApexchartsModule,
        ComponentsModule,
        chartjsModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatTableExporterModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
    ],
    providers: [CdkColumnDef]
})
export class SalesModule { }
