import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmerDetailsComponent } from './pages/farmer-details/farmer-details.component';
import { FarmerManagenentComponent } from './pages/farmer-managenent/farmer-managenent.component';
import { FarmerAnalyticsComponent } from './pages/farmer-analytics/farmer-analytics.component';

const routes: Routes = [
  {
    path: "farmers",
    component: FarmerManagenentComponent,
  },

  {
    path: "farmers/analytics",
    component: FarmerAnalyticsComponent,
  },

  {
    path: "farmers/:id",
    component: FarmerDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
