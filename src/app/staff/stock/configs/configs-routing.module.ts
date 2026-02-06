import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ProductsConfigsComponent } from './products-configs/products-configs.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ProductsConfigsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
