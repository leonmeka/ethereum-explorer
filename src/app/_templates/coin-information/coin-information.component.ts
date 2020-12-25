import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data-service';

@Component({
  selector: 'app-coin-information',
  templateUrl: './coin-information.component.html',
  styleUrls: ['./coin-information.component.css']
})
export class CoinInformationComponent implements OnInit {
  public collapsed:boolean;

  public id:string;
  public symbol:string;
  public marketCap: number;
  public marketCapRank: number;
  public currentPriceUSD:number;
  public allTimeHigh:number;
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
}
