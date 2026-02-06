import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.AdminDashboardModule),
  },
  {
    path: "administrator",
    loadChildren: () => import("./administration/administration.module").then((m) => m.AdministrationModule),
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then(
        (m) => m.RolesModule
      ),
  },

  {
    path: "user-profile",
    loadChildren: () =>
      import("./users/users.module").then(
        (m) => m.UsersModule
      ),
  },
  {
    path: "user-accounts",
    loadChildren: () => import("./users/users.module").then((m) => m.UsersModule)
  },
  {
    path: "counties",
    loadChildren: () =>
      import("./counties/counties.module").then(
        (m) => m.CountiesModule
      ),
  },

  {
    path: "sub-counties",
    loadChildren: () =>
      import("./sub-counties/subcounties.module").then(
        (m) => m.SubcountiesModule
      ),
  },
  {
    path: "business-profile",
    loadChildren: () =>
      import("./profile/profile.module").then(
        (m) => m.ProfileModule
      ),
  },

  {
    path: "departments",
    loadChildren: () =>
      import("./departments/departments.module").then(
        (m) => m.DepartmentsModule
      ),
  },

  {
    path: "transporters",
    loadChildren: () => import("./transporters/transporters.module").then((m) => m.TransportersModule)
  },

  {
    path: "pickup-locations",
    loadChildren: () =>
      import("./pick-up-locations/pickup.module").then(
        (m) => m.PickupModule
      ),
  },

  {
    path: "routes",
    loadChildren: () =>
      import("./routes/routes.module").then(
        (m) => m.RoutesModule
      ),
  },

  {
    path: "payment-management",
    loadChildren: () => import("./payment-management/payment-management.module").then((m) => m.PaymentManagementModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
