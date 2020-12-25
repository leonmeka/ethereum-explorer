import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/_services/data-service';
import { CoinInformationComponent } from '../coin-information/coin-information.component';

@Component({
  selector: 'app-adress-information',
  templateUrl: './adress-information.component.html',
  styleUrls: ['./adress-information.component.css']
})
export class AdressInformationComponent implements OnInit {
  collapsed:boolean;
  balance:number;
  value:number;
  adress:string;

  informationReceived:boolean;
  severeError:boolean;
  error:boolean;
  errorMessage:string;


  constructor(private _dataService:DataService, private _coinInformation:CoinInformationComponent) {
  }

  ngOnInit(): void {

  }

  public loadAdressData(event:any){
      this._dataService.getAdressData(this.adress).subscribe((data) => {
      this.error = false;
      this.severeError = false;
      this.informationReceived = true;

      // Divided by this huge number in order to get the real value.. should find a better way to do this!
      this.balance = data["balance"]/1000000000000000000 as number;
      this.value = this.roundTo(this.balance * this._coinInformation.currentPriceUSD,2);

      }, error =>{
        //console.log(error.statusText);
        if(error.statusText == "OK"){
          this.error = true;
          this.severeError = false;
          this.informationReceived = false;
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
