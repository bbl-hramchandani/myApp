import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TransactionListPage } from '../pages/transaction-list/transaction-list';
import { LogoffPage } from '../pages/logoff/logoff';
import { OperationPage } from '../pages/operation/operation';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AtmserviceProvider } from '../providers/atmservice/atmservice';
import { HttpinterceptorProvider } from '../providers/httpinterceptor/httpinterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    TransactionListPage,
    LogoffPage,
    OperationPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransactionListPage,
    LogoffPage,
    OperationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AtmserviceProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorProvider,
      multi: true
    }
  ]
})
export class AppModule {}
