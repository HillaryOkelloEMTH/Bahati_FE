import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ManageDepartmentsComponent,
  },
  { 
    path: "**", component: Page404Component 
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
