import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ManagePickupsComponent } from './manage-pickups/manage-pickups.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ManagePickupsComponent,
  },
  {
    path: "**", component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickupRoutingModule { }
