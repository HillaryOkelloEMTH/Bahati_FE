import { ErrorHandler, Injectable, NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { fakeBackendProvider } from "./core/interceptor/fake-backend";
import { ErrorInterceptor } from "./core/interceptor/error.interceptor";
import { JwtInterceptor } from "./core/interceptor/jwt.interceptor";
import { LocationStrategy, HashLocationStrategy, DatePipe } from "@angular/common";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ClickOutsideModule } from "ng-click-outside";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { FooterComponent } from "./layout/footer/footer.component";
import { NgApexchartsModule } from "ng-apexcharts";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      console.warn('Chunk load failed. Reloading the app.');
      window.location.reload(); // Force a reload
    } else {
      throw error;
    }
  }
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    NgApexchartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LoadingBarRouterModule,
    // core & shared
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
