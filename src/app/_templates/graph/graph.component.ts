
import { Component } from '@angular/core';
import { DataService } from 'src/app/_services/data-service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent {
  public multi:Object = [];
  public colorScheme = {
    domain: ['#0275d8']
  };

  severeError:boolean;
  error:boolean;
  errorMessage:string;

  loading:boolean;

  constructor(private _dataService:DataService) { 
    this.loadCoinHistory();
  }

  public loadCoinHistory(){
    this.loading = true;
    this.error = false;
    this.severeError = false;

    this._dataService.getCoinHistoryData().subscribe((_data) => {
      var string = JSON.stringify(_data);
      string = string.split('timestamp').join('name');
      string = string.split('rate').join('value');
      
      var json = JSON.parse(string);
      
      this.multi = 
      [
        {
          "name": "ETH/USD",
          "series": [
          ]
        }
      ];        

      this.multi[0]["series"] = json;

      this.multi[0]["series"].forEach(element => {
        this.error = false;
        this.severeError = false;

        element["name"] = new Date(Date.parse(element["name"]));
        element["value"] = this.roundTo(element["value"],2);

        this.loading = false;
      });
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