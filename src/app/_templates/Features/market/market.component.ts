import { Component, Inject, OnInit } from '@angular/core';
import { Market } from 'src/app/_interfaces/market';
import { DataService } from 'src/app/_services/data-service';
import { AppUtilities } from 'src/app/_utilities/AppUtilities';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  public collapsed: boolean;

  public id: string;
  public symbol: string;
  public market_cap: number;
  public market_cap_change_percentage_24h: number;
  public volume: number;
  public circulating_supply: number;
  public market_cap_rank: number;
  public current_price: number;
  public all_time_high: number;
  public all_time_low: number;
  public price_change_24h: number;
  public price_change_percentage_24h: number;
  public price_change_positive: boolean;
  public description: string;
  public markets: Market[];

  severeError: boolean;
  error: boolean;
  errorMessage: string;

  loading: boolean;

  constructor(private _dataService: DataService, @Inject(DOCUMENT) private document: Document, private _appUtilities: AppUtilities) {
    this.loadMarketData();
    this.markets = [];
    this.collapsed = true;
  }

  ngOnInit(): void {
  }

  public loadMarketData() {
    this.loading = true;
    this.error = false;
    this.severeError = false;

    this._dataService.getCoinData().subscribe((data) => {
      this.id = data["id"];
      this.id = this.id.charAt(0).toUpperCase() + this.id.slice(1);

      this.symbol = data["symbol"];
      this.symbol = this.symbol.toUpperCase();

      this.market_cap = this._appUtilities.formatMoney(data["market_data"]["market_cap"]["usd"]);
      this.volume = this._appUtilities.formatMoney(data["market_data"]["total_volume"]["usd"]);
      this.circulating_supply = this._appUtilities.formatMoney(data["market_data"]["circulating_supply"]);
      this.market_cap_rank = data["market_cap_rank"];
      this.market_cap_change_percentage_24h = data["market_data"]["market_cap_change_percentage_24h"].toFixed(2);
      this.current_price = data["market_data"]["current_price"]["usd"];
      this.all_time_high = this._appUtilities.formatMoney(data["market_data"]["ath"]["usd"]);
      this.all_time_low = this._appUtilities.formatMoney(data["market_data"]["atl"]["usd"]);
      this.description = data["ico_data"]["short_desc"];
      this.price_change_24h = this._appUtilities.formatMoney(this.roundTo(data["market_data"]["price_change_24h"], 2));
      this.price_change_percentage_24h = this.roundTo(data["market_data"]["price_change_percentage_24h"], 2);

      this.price_change_positive = (this.price_change_24h > 0) ? true : false

      data["tickers"].forEach(m => {
        if (m["base"].length <= 3) {
          const newMarket = {
            name: m["market"]["name"],
            pair: m["base"] + "/" + m["target"],
            price: this._appUtilities.formatMoney(m["converted_last"]["usd"]),
            volume: m["converted_volume"]["usd"],
            trust_score: m["trust_score"],
            link: m["trade_url"]
          };

          this.markets.push(newMarket);
        }
      });

      this.sortBy("volumeDown");

      this.loading = false;
    }, error => {
      if (error.statusText == "OK") {
        this.errorMessage = error.statusText + "(" + error.message + ")";
        this.error = true;
        this.severeError = false;

        this.loading = false;
      } else {
        this.errorMessage = error.statusText + "(" + error.message + ")";
        this.severeError = true;
        this.error = false;

        this.loading = false;
      }
    });
  }

  private roundTo(n, digits): number {
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

  public reloadData() {
    this.loadMarketData();
  }

  public sortBy(criteria: string) {
    if (criteria == "volumeUp") {
      this.markets.sort((a, b) => (a.volume > b.volume) ? 1 : ((b.volume > a.volume) ? -1 : 0));
    } else if ((criteria == "volumeDown")) {
      this.markets.sort((b, a) => (a.volume > b.volume) ? 1 : ((b.volume > a.volume) ? -1 : 0));
    } if (criteria == "priceUp") {
      this.markets.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    } else if ((criteria == "priceDown")) {
      this.markets.sort((b, a) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    }
  }
}
