import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './utilities/_helper/jwt.interceptor';
import { NotifierModule } from 'angular-notifier';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { customNotifierOptions } from './utilities/_services/notification.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarService } from './shared/components/side-bar/sidebar.service';
import { AvatarModule } from 'ngx-avatar';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //MainModule,
    AvatarModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxUiLoaderModule,
    NgxPaginationModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularEditorModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    SidebarService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
