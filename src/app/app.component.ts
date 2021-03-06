import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'ethereum-explorer';
  showSidebar = false;

  showWalletApp = true;
  showMarketApp = false;
  showNewsApp = false;

  toggleClass() {
    this.showSidebar = !this.showSidebar;
  }

  changeApp(app: string, closeSidebar: boolean) {
    this.showWalletApp = false;
    this.showMarketApp = false;
    this.showNewsApp = false;

    if (app == "wallet") {
      this.showWalletApp = true;
    } else if (app == "market") {
      this.showMarketApp = true;
    } else if (app == "news") {
      this.showNewsApp = true;
    }

    if (closeSidebar) {
      this.toggleClass();
    }
  }
}
