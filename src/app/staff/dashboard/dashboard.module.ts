import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './templates/main/main.component';
import { CollectionsPerCollectorComponent } from './collections-per-collector/collections-per-collector.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule as chartjsModule } from "ng2-charts";

import { FarmersPerPickupLocationComponent } from './farmers-per-pickup-location/farmers-per-pickup-location.component';
import { PickupLocationsPerWardComponent } from './pickup-locations-per-ward/pickup-locations-per-ward.component';
import { MilkCollectionsPerWardComponent } from './milk-collections-per-ward/milk-collections-per-ward.component';
import { MilkQauntityPerLocationComponent } from './components/milk-qauntity-per-location/milk-qauntity-per-location.component';
import { CollectorCollectionsComponent } from './components/collector-collections/collector-collections.component';
import { CollectorCollectionsMilkPriceComponent } from './components/collector-collections-milk-price/collector-collections-milk-price.component';
import { MilkCollectionQuantityAgainstPriceComponent } from './components/milk-collection-quantity-against-price/milk-collection-quantity-against-price.component';
import { CollectorCollectionsInQuantityPerSessionComponent } from './components/collector-collections-in-quantity-per-session/collector-collections-in-quantity-per-session.component';
import { CollectorCollectionsInPricePerSessionComponent } from './components/collector-collections-in-price-per-session/collector-collections-in-price-per-session.component';
import { CollectorCollectionsCountComponent } from './components/collector-collections-count/collector-collections-count.component';
import { CollectionsQuantityComponent } from './components/collections-quantity/collections-quantity.component';
import { CollectionsPriceComponent } from './components/collections-price/collections-price.component';
import { CollectorCollectionsPerDateComponent } from './components/collector-collections-per-date/collector-collections-per-date.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CollectorsLookupsComponent } from './look-ups/collectors-lookups/collectors-lookups.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { BahatiDailySummaryComponent } from './components/bahati-daily-summary/bahati-daily-summary.component';


@NgModule({
  declarations: [
    MainComponent,
    CollectionsPerCollectorComponent,
    FarmersPerPickupLocationComponent,
    PickupLocationsPerWardComponent,
    MilkCollectionsPerWardComponent,
    MilkQauntityPerLocationComponent,
    CollectorCollectionsComponent,
    CollectorCollectionsMilkPriceComponent,
    MilkCollectionQuantityAgainstPriceComponent,
    CollectorCollectionsInQuantityPerSessionComponent,
    CollectorCollectionsInPricePerSessionComponent,
    CollectorCollectionsCountComponent,
    CollectionsQuantityComponent,
    CollectionsPriceComponent,
    CollectorCollectionsPerDateComponent,
    CollectorsLookupsComponent,
    BahatiDailySummaryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    NgApexchartsModule,
    DashboardRoutingModule,
    chartjsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatTableExporterModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
   
  ],
  exports: [
    CollectionsPerCollectorComponent,
    FarmersPerPickupLocationComponent,
    PickupLocationsPerWardComponent,
    MilkCollectionsPerWardComponent,
    MilkQauntityPerLocationComponent,
    CollectorCollectionsComponent,
    CollectorCollectionsMilkPriceComponent,
    MilkCollectionQuantityAgainstPriceComponent,
    CollectorCollectionsInQuantityPerSessionComponent,
    CollectorCollectionsInPricePerSessionComponent,
    CollectorCollectionsCountComponent,
    CollectionsQuantityComponent,
    CollectionsPriceComponent,
    CollectorCollectionsPerDateComponent,
    CollectorsLookupsComponent,
    BahatiDailySummaryComponent
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
