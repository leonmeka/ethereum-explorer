import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/_services/data-service';
import { MarketComponent } from '../market/market.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  collapsed:boolean;

  balance:number;
  value:number;
  adress:string;
  transactions_number:number;
  unconfirmed_transactions_number:number;
  qr_url:string;

  price_change_24h:number;
  price_change_percentage_24h:number;

  informationReceived:boolean;
  severeError:boolean;
  error:boolean;
  errorMessage:string;

  loading:boolean;


  constructor(private _dataService:DataService, private _marketComponent:MarketComponent) {
    this.adress = "0x65AF82C869bE260A445c76B6350B3B07d9483e8d";
    this.loadAdressData(null);
  }

  ngOnInit(): void {

  }

  public loadAdressData(event:any){
    this.loading = true;
    this.error = false;
    this.severeError = false;
    this.informationReceived = false;

    this._dataService.getAdressData(this.adress).subscribe((data) => {
    // Divided by this huge number in order to get the real value.. should find a better way to do this!
    this.price_change_24h = this._marketComponent.price_change_24h;
    this.price_change_percentage_24h = this._marketComponent.price_change_percentage_24h;
    this.balance = this.roundTo(data["balance"]/1000000000000000000 as number,2);
    this.value = this.roundTo(this.balance * this._marketComponent.currentPriceUSD,2);
    this.transactions_number = data["n_tx"];
    this.unconfirmed_transactions_number = data["unconfirmed_n_tx"];
    this.qr_url = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+this.adress+"&choe=UTF-8";

    this.informationReceived = true;
    this.loading = false;
    }, error =>{
      if(error.statusText == "OK"){
        this.error = true;
        this.severeError = false;
        this.informationReceived = false;

        this.loading = false;
      }else{
        this.errorMessage = error.statusText + "(" + error.message + ")";
        this.severeError = true;
        this.error = false;
        this.informationReceived = false;
      }
    });
      
  }

  private roundTo(n, digits):number {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
  }
}
