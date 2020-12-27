import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data-service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  public collapsed:boolean;

  public id:string;
  public symbol:string;
  public marketCap: number;
  public marketCapRank: number;
  public currentPriceUSD:number;
  public allTimeHigh:number;
  public price_change_24h:number;
  public price_change_percentage_24h:number;
  public allTimeLow:number;
  public trustScore:string;
  public desc:string;

  severeError:boolean;
  error:boolean;
  errorMessage:string;

  loading:boolean;

  constructor(private _dataService:DataService) { 
    this.loadCoinData();
    this.collapsed = false;
  }

  ngOnInit(): void {
  }

  public loadCoinData(){
    this.loading = true;
    this.error = false;
    this.severeError = false;
    
    this._dataService.getCoinData().subscribe((data) => {
      this.id = data["id"];
      this.id = this.id.charAt(0).toUpperCase() + this.id.slice(1);

      this.symbol = data["symbol"];
      this.symbol = this.symbol.toUpperCase();
      
      this.marketCap = data["market_data"]["market_cap"]["usd"];
      this.marketCapRank = data["market_cap_rank"];
      this.currentPriceUSD = data["market_data"]["current_price"]["usd"];
      this.allTimeHigh = data["market_data"]["ath"]["usd"];
      this.allTimeLow = data["market_data"]["atl"]["usd"];
      this.desc = data["ico_data"]["short_desc"];
      this.price_change_24h = this.roundTo(data["market_data"]["price_change_24h"],2);
      this.price_change_percentage_24h = this.roundTo(data["market_data"]["price_change_percentage_24h"],2);

      this.loading = false;
      }, error =>{
        if(error.statusText == "OK"){
          this.errorMessage = error.statusText + "(" + error.message + ")";
          this.error = true;
          this.severeError = false;

          this.loading = false;
        }else{
          this.errorMessage = error.statusText + "(" + error.message + ")";
          this.severeError = true;
          this.error = false;
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