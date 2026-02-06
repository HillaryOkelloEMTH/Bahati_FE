import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  {
    path: "add",
    component: AddRoleComponent,
    // canActivate: [RoutePrivilegeGuard],
    // data: { requiredPrivilege: ["Create role"] },
  },
  {
    path: "view",
    component: RolesComponent,
    // canActivate: [RoutePrivilegeGuard],
    // data: { requiredPrivilege: ["View roles"] },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
