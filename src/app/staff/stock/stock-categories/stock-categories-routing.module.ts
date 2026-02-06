import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStockCategoriesComponent } from './manage-stock-categories/manage-stock-categories.component';

const routes: Routes = [
  {
    path: "",
    component: ManageStockCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockCategoriesRoutingModule { }
