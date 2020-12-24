import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './_templates/navbar/navbar.component';
import { ContentComponent } from './_templates/content/content.component';
import { AdressInformationComponent } from './_templates/adress-information/adress-information.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_templates/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CoinInformationComponent } from './_templates/coin-information/coin-information.component';
import { GraphComponent } from './_templates/graph/graph.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    AdressInformationComponent,
    FooterComponent,
    CoinInformationComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [CoinInformationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
