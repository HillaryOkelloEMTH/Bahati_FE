import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTabsModule } from "@angular/material/tabs";
import { RightSidebarComponent } from "./right-sidebar/right-sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { ComponentsModule } from "../shared/components/components.module";
@NgModule({
    declarations: [
        RightSidebarComponent
    ],
    imports: [CommonModule, NgbModule, MatTabsModule, SharedModule,ComponentsModule]
})
export class LayoutModule {}
