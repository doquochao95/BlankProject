
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { GlobalHttpInterceptor } from '../app/_core/utilities/global-http-interceptor';
// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-alt-snotify';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxBreadcrumbModule } from "ngx-dynamic-breadcrumb";
import {LocalStorageConstants} from './_core/constants/local-storage.constants';
import {LoginComponent} from './views/login/login.component';
import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../app/_core/services/modal.service';
import { NgxOrgChartModule } from '@tots/ngx-org-chart';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function tokenGetter() {
  return localStorage.getItem(LocalStorageConstants.TOKEN);
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    NgxOrgChartModule,
    // PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    IconModule,
    SnotifyModule,
    NgxSpinnerModule,
    NgxBreadcrumbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true },
    SnotifyService,
    IconSetService,
    ModalService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

