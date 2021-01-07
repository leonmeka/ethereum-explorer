import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API_URL_BLOCKCHAIN: string = "https://api.blockcypher.com/v1/eth/main/addrs/";
  private API_URL_MARKET: string = "https://api.coingecko.com/api/v3/coins/ethereum";
  private API_URL_MARKET_HISTORY: string = "https://api.nomics.com/v1/exchange-rates/history?key=demo-26240835858194712a4f8cc0dc635c7a&currency=ETH&start=2017-01-01T00%3A00%3A00Z&end=" + Date.now();
  private API_URL_NEWS: string = "https://api.ft.com/content/search/v1?apiKey=59cbaf20e3e06d3565778e7b916fdf18b23e41209fe0ac67ead43397";

  constructor(private http: HttpClient) {

  }

  // GET
  public getAdressData(adress: string): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<JSON>(this.API_URL_BLOCKCHAIN + adress, httpOptions);
  }

  // GET
  public getCoinData(): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<JSON>(this.API_URL_MARKET, httpOptions);
  }

  // GET
  public getCoinHistoryData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    return this.http.get<any>(this.API_URL_MARKET_HISTORY, httpOptions);
  }

  // GET
  public getNewsData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const requestBody = {
      "queryString": "Ethereum",
      "resultContext": {
        "aspects": ["title", "lifecycle", "location", "summary", "editorial"],
        "maxResults": "15"
      },
      "queryContext": {
        "curations": ["ARTICLES"]
      }
    }

    return this.http.post<any>(this.API_URL_NEWS, requestBody, httpOptions);
  }
}
