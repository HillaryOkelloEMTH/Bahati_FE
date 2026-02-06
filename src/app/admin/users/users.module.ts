import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { ActiveAccountsComponent } from "./pages/active-accounts/active-accounts.component";
import { LockedAccountsComponent } from "./pages/locked-accounts/locked-accounts.component";
import { AddAccountComponent } from "./pages/add-account/add-account.component";
import { ActivateAccountComponent } from "./pages/activate-account/activate-account.component";
import { DeleteAccountComponent } from "./pages/delete-account/delete-account.component";
import { DeletedAccountsComponent } from "./pages/deleted-accounts/deleted-accounts.component";
import { InactiveAccountsComponent } from "./pages/inactive-accounts/inactive-accounts.component";
import { UpdateAccountComponent } from "./pages/update-account/update-account.component";
import { AccountDetailsComponent } from "./pages/account-details/account-details.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableExporterModule } from "mat-table-exporter";
import { SharedModule } from "src/app/shared/shared.module";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { RestoreAccountComponent } from "./pages/restore-account/restore-account.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ModifyAccountComponent } from "./pages/modify-account/modify-account.component";
import { AccountLogsComponent } from "./pages/account-logs/account-logs.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { UserWidgetsComponent } from "./pages/user-widgets/user-widgets.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { UnlockAccountComponent } from './pages/unlock-account/unlock-account.component';
import { LockAccountComponent } from './pages/lock-account/lock-account.component';
import { PendingAccountsComponent } from './pages/pending-accounts/pending-accounts.component';
import { RejectedAccountsComponent } from './pages/rejected-accounts/rejected-accounts.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { RolesLookupComponent } from './pages/dialogs/roles-lookup/roles-lookup.component';
import { MatCardModule } from "@angular/material/card";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { UsersComponent } from "./pages/users/users.component";
import { AdminUpdateUserPasswordComponent } from './pages/dialogs/admin-update-user-password/admin-update-user-password.component';
import { LookupMilkCollectorsComponent } from "./pages/milk-collectors/lookup-milk-collectors/lookup-milk-collectors.component";
import { ViewCollectorsComponent } from "./pages/milk-collectors/view-collectors/view-collectors.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    ActiveAccountsComponent,
    LockedAccountsComponent,
    AddAccountComponent,
    ActivateAccountComponent,
    DeleteAccountComponent,
    DeletedAccountsComponent,
    InactiveAccountsComponent,
    UpdateAccountComponent,
    AccountDetailsComponent,
    RestoreAccountComponent,
    ModifyAccountComponent,
    UserWidgetsComponent,
    AccountLogsComponent,
    UnlockAccountComponent,
    LockAccountComponent,
    PendingAccountsComponent,
    RejectedAccountsComponent,
    VerifyAccountComponent,
    RolesLookupComponent,
    UsersComponent,
    AdminUpdateUserPasswordComponent,

    LookupMilkCollectorsComponent,
    ViewCollectorsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    SharedModule,
    ComponentsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatCardModule,
    PerfectScrollbarModule,
    MatCheckboxModule
  ],
  providers: [
    DatePipe
  ]
})
export class UsersModule {}
