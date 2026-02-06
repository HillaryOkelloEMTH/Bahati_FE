import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { BulkDeliveryComponent } from './bulk-delivery/bulk-delivery.component';

const routes: Routes = [
  {
    path: "bulk-upload",
    canActivate: [AuthGuard],
    component: BulkDeliveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
