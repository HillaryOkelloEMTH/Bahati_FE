import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "./../../shared/shared.module";
import { CollectionsPerUserComponent } from './collections-per-user/collections-per-user.component';
import { MainComponent } from "./main/main.component";
import { UsersPerDepartmentComponent } from "./users-per-department/users-per-department.component";
import { UsersPerRoleComponent } from "./users-per-role/users-per-role.component";
import { DashboardModule } from "src/app/staff/dashboard/dashboard.module";

@NgModule({
  declarations: [
    MainComponent,
    CollectionsPerUserComponent,
    UsersPerDepartmentComponent,
    UsersPerRoleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    ComponentsModule,
    SharedModule,
    DashboardModule
    
  ],
})
export class AdminDashboardModule {}
