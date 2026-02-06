import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule)
  },
  {
    path: "farmers",
    loadChildren: () =>
      import("./farmer/farmer.module").then((m) => m.FarmerModule)
  },
  {
    path: "user-profile",
    loadChildren: () => import("./../admin/users/users.module").then((m) => m.UsersModule)
  },
  {
    path: "administrator",
    loadChildren: () => import("./../admin/administration/administration.module").then((m) => m.AdministrationModule)
  },
  {
    path: "sales",
    loadChildren: () =>
      import("./sales/sales.module").then((m) => m.SalesModule)
  },

  {
    path: "configs",
    loadChildren: () =>
      import("./stock/configs/configs.module").then(
        (m) => m.ConfigsModule
      ),
  },

  {
    path: "stock-categories",
    loadChildren: () =>
      import("./stock/stock-categories/stock-categories.module").then(
        (m) => m.StockCategoriesModule
      ),
  },


  {
    path: "sms",
    loadChildren: () =>
      import("./sms/sms.module").then(
        (m) => m.SmsModule
      ),
  },


  {
    path: "cans",
    loadChildren: () =>
      import("./milk-cans/milk-cans.module").then(
        (m) => m.MilkCansModule
      ),
  },

  {
    path: "inventory",
    loadChildren: () =>
      import("./stock/inventory/inventory.module").then(
        (m) => m.InventoryModule
      ),
  },
{
    path: "payment-management",
    loadChildren: () =>
      import("./payment-management/payment-management.module").then((m) => m.PaymentManagementModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
