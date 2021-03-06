import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/_services/data-service';
import { MarketComponent } from '../market/market.component';
import { Wallet } from '../../../_interfaces/wallet';
import { CookieService } from 'ngx-cookie-service';
import { AppUtilities } from 'src/app/_utilities/AppUtilities';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletComponent implements OnInit {

  @ViewChild('closeModal')
  public closeModal: ElementRef

  @ViewChild("video")
  public video: ElementRef;

  cameraEnabled: boolean;
  scanSuccessful: boolean;

  wallet: Wallet;
  wallets: Wallet[];
  sortedUp: boolean;

  adress: string;

  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_positive: boolean;

  adressIsValid: boolean;
  severeError: boolean;
  error: boolean;
  errorMessage: string;

  loading: boolean;

  constructor(private _dataService: DataService, private _marketComponent: MarketComponent, private cookieService: CookieService, private _appUtilities: AppUtilities, private _electronService: ElectronService) {
    this.wallets = [];
    try {
      //this._electronService.ipcRenderer.send("load", "eth-adresses");
      //this._electronService.ipcRenderer.on("asynchronous-reply", (event, response) => {
      // this.wallets = JSON.parse(response);
      // console.log("[COOKIES]: Found " + JSON.stringify(this.wallets))
      //});

      this.wallets = JSON.parse(window.localStorage["eth-adresses"]);
      this.reloadData();
    } catch (e) {
      console.log("[COOKIES]: cookies empty");
    }
  }

  ngOnInit(): void {

  }

  public loadAdressData(adress: string) {
    this.loading = true;
    this.error = false;
    this.severeError = false;
    this.wallet = null;

    if (adress != "") {
      this._dataService.getAdressData(adress).subscribe((data) => {
        this.price_change_24h = this._marketComponent.price_change_24h;
        this.price_change_percentage_24h = this._marketComponent.price_change_percentage_24h;
        this.price_change_positive = (this.price_change_24h > 0) ? true : false

        this.wallet = {
          adress: adress,
          balance: this._appUtilities.formatMoney(AppUtilities.calculateDollarValue(data["balance"])),
          value: this._appUtilities.formatMoney(Number(Math.round(Number(Math.round(data["balance"] / 10000000000000000) + "e-0") * this._marketComponent.current_price) + "e-2")),
          transactions_number: data["n_tx"],
          unconfirmed_transactions_number: data["unconfirmed_n_tx"],
          qr_url: "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" + adress + "&choe=UTF-8",
          collapsed: false
        };

        var found = false;
        for (var i = 0; i < this.wallets.length; i++) {
          if (this.wallets[i].adress == adress) {

            found = true;
            this.wallets[i] = this.wallet;
            break;
          }
        }
        if (!found) {
          this.wallets.push(this.wallet);
        }

        //this._electronService.ipcRenderer.send("save", JSON.stringify(this.wallets));
        window.localStorage["eth-adresses"] = JSON.stringify(this.wallets);
        this.loading = false;
      }, error => {
        if (error.statusText == "OK") {
          this.error = true;
          this.severeError = false;
          this.loading = false;
        } else {
          this.errorMessage = error.statusText + "(" + error.message + ")";
          this.severeError = true;
          this.error = false;
        }
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  public openCamera(event: any): void {
    this.scanSuccessful = false;
    this.cameraEnabled = true;
  }

  public takePhoto(resultString) {
    this.closeModal.nativeElement.click()
    this.cameraEnabled = false;
    this.adress = resultString;
    this.scanSuccessful = true;
    this.loadAdressData(this.adress);
  }

  public reloadData() {
    for (let wallet of this.wallets) {
      this.loadAdressData(wallet.adress);
    }
  }

  public deleteFromWallets(wallet: Wallet): void {
    const index = this.wallets.indexOf(wallet, 0);
    if (index > -1) {
      this.wallets.splice(index, 1);
      window.localStorage["eth-adresses"] = JSON.stringify(this.wallets);
      //this._electronService.ipcRenderer.send("save", JSON.stringify(this.wallets));
    }
  }


  public sortBy(criteria: string) {
    if (criteria == "up") {
      this.wallets.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
      this.sortedUp = true;
    } else {
      this.wallets.sort((b, a) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
      this.sortedUp = false;
    }
  }
}
