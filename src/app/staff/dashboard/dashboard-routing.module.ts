import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { MainComponent } from './templates/main/main.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
