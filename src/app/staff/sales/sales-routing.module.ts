import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionDetailsComponent } from './pages/collection-details/collection-details.component';
import { CollectionsPerCollectorsComponent } from './pages/collections-per-collectors/collections-per-collectors.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CollectorsFloatAllocationsComponent } from './pages/collectors-float-allocations/collectors-float-allocations.component';
import { ProductsAllocationComponent } from './pages/products-allocation/products-allocation.component';
import { SalesManagenentComponent } from './pages/sales-managenent/sales-managenent.component';

const routes: Routes = [
  {
    path: "sales",
    component: SalesManagenentComponent,
  },
  {
    path: "collections",
    component: CollectionsComponent,
  },
  {
    path: "collections/collector",
    component: CollectionsPerCollectorsComponent,
  },
  {
    path: "allocations",
    component: CollectorsFloatAllocationsComponent,
  },
  {
    path: "farmer/:fno",
    component: CollectionDetailsComponent,
  },
  {
    path: "products/sales",
    component: ProductsAllocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
