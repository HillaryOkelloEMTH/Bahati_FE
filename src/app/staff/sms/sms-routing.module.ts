import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsManagementComponent } from './sms-management/sms-management.component';
import { BulkComponent } from './bulk/bulk.component';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SmsLimitsComponent } from './sms-limits/sms-limits.component';

const routes: Routes = [
  {
    path: "",
    component: SmsManagementComponent,
  },
  {
    path: "template",
    component: SmsTemplateComponent,
  },
  {
    path: "limits",
    component: SmsLimitsComponent,
  },
  {
    path: "bulk",
    component: BulkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
