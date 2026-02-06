import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMilkCansComponent } from './manage-milk-cans/manage-milk-cans.component';

const routes: Routes = [
  {
    path: "",
    component: ManageMilkCansComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilkCansRoutingModule { }
