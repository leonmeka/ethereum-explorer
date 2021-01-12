import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './_templates/navbar/navbar.component';
import { WalletComponent } from './_templates/features/wallets/wallets.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_templates/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MarketComponent } from './_templates/features/market/market.component';
import { GraphComponent } from './_templates/features/market/graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NewsComponent } from './_templates/features/news/news.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppUtilities } from './_utilities/AppUtilities';

import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WalletComponent,
    FooterComponent,
    MarketComponent,
    GraphComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    ZXingScannerModule,
    NgxElectronModule
  ],
  providers: [MarketComponent, AppUtilities, NgxElectronModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
