import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from './app-material.module';
import { ApifetcherService } from 'src/services/apifetcher.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTransactionDialogComponent } from './dialogs/add.transaction.dialog/add.transaction.dialog.component';
import { StatiscticsComponent } from './statisctics/statisctics.component';
import { ChartsModule } from 'ng2-charts';
import localeUa from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeUa, 'ru-RU');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddTransactionDialogComponent,
    StatiscticsComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ApifetcherService, {
    provide: LOCALE_ID,
    useValue: 'ru-RU' // 'de-DE' for Germany, 'fr-FR' for France ...
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
