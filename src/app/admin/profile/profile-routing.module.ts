import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { CreateBusinessProfileComponent } from './create-business-profile/create-business-profile.component';
import { EditBusinessProfileComponent } from './edit-business-profile/edit-business-profile.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: BusinessProfileComponent,
  },
  {
    path: "create",
    canActivate: [AuthGuard],
    component: CreateBusinessProfileComponent,
  },
  {
    path: "edit",
    canActivate: [AuthGuard],
    component: EditBusinessProfileComponent,
  },
  {
    path: "**", component: Page404Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
