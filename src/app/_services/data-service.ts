import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API_URL_BLOCKCHAIN:string = "https://api.blockcypher.com/v1/eth/main/addrs/";
  private API_URL_COIN:string = "https://api.coingecko.com/api/v3/coins/ethereum";
  private API_URL_COIN_HISTORY:string = "https://api.nomics.com/v1/exchange-rates/history?key=demo-26240835858194712a4f8cc0dc635c7a&currency=ETH&start=2017-01-01T00%3A00%3A00Z&end="+Date.now();

  constructor(private http: HttpClient) { 
    
  }

  // GET
  public getAdressData(adress:string): Observable<JSON>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<JSON>(this.API_URL_BLOCKCHAIN+adress, httpOptions);
  }

  // GET
  public getCoinData(): Observable<JSON>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<JSON>(this.API_URL_COIN, httpOptions);
  }

   // GET
   public getCoinHistoryData(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    return this.http.get<any>(this.API_URL_COIN_HISTORY, httpOptions);
  }
}
