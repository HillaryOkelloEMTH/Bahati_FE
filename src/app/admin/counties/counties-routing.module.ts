import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ManageCountiesComponent } from './manage-counties/manage-counties.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ManageCountiesComponent,
  },
  {
    path: "**", component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountiesRoutingModule { }
