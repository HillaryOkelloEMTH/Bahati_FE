import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutePrivilegeGuard } from "src/app/data/services/_AccessControlAuthGuard.service";
import { AccountLogsComponent } from "./pages/account-logs/account-logs.component";
import { ActiveAccountsComponent } from "./pages/active-accounts/active-accounts.component";
import { AddAccountComponent } from "./pages/add-account/add-account.component";
import { DeletedAccountsComponent } from "./pages/deleted-accounts/deleted-accounts.component";
import { InactiveAccountsComponent } from "./pages/inactive-accounts/inactive-accounts.component";
import { LockedAccountsComponent } from "./pages/locked-accounts/locked-accounts.component";
import { ViewCollectorsComponent } from "./pages/milk-collectors/view-collectors/view-collectors.component";
import { ModifyAccountComponent } from "./pages/modify-account/modify-account.component";
import { PendingAccountsComponent } from "./pages/pending-accounts/pending-accounts.component";
import { RejectedAccountsComponent } from "./pages/rejected-accounts/rejected-accounts.component";
import { UsersComponent } from "./pages/users/users.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: "all",
    component: UsersComponent,
  },
  {
    path: "pending-accounts",
    component: PendingAccountsComponent,
  },
  {
    path: "rejected-accounts",
    component: RejectedAccountsComponent,
  },
  {
    path: "active-accounts",
    component: ActiveAccountsComponent,
  },
  {
    path: "inactive-accounts",
    component: InactiveAccountsComponent,
  },
  {
    path: "locked-accounts",
    component: LockedAccountsComponent,
  },
  {
    path: "deleted-accounts",
    component: DeletedAccountsComponent,
  },
  {
    path: "add-account",
    component: AddAccountComponent,
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "modify-account/:id",
    component: ModifyAccountComponent,
  },
  {
    path: "account-logs/:id",
    component: AccountLogsComponent,
  },

  {
    path: "collectors",
    component: ViewCollectorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
