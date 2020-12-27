import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './_templates/navbar/navbar.component';
import { WalletComponent } from './_templates/Features/wallet/wallet.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_templates/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MarketComponent } from './_templates/Features/market/market.component';
import { GraphComponent } from './_templates/Features/market/graph/graph.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { NewsComponent } from './_templates/Features/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WalletComponent,
    FooterComponent,
    MarketComponent,
    GraphComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [MarketComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
