import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from 'src/app/_services/data-service';
import { MarketComponent } from '../market/market.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  @ViewChild('closeModal') 
  public closeModal: ElementRef

  @ViewChild("video")
  public video: ElementRef;
    
  collapsed:boolean;
  cameraEnabled:boolean;
  scanSuccessful:boolean;

  balance:number;
  value:number;
  adress:string;
  transactions_number:number;
  unconfirmed_transactions_number:number;
  qr_url:string;
  qrResultString: string;

  price_change_24h:number;
  price_change_percentage_24h:number;

  adressIsValid:boolean;
  severeError:boolean;
  error:boolean;
  errorMessage:string;

  loading:boolean;


  constructor(private _dataService:DataService, private _marketComponent:MarketComponent) {
  }

  ngOnInit(): void {

  }

  public loadAdressData(event:any){
    this.loading = true;
    this.error = false;
    this.severeError = false;
    this.adressIsValid = false;

    if(this.adress != ""){
      this._dataService.getAdressData(this.adress).subscribe((data) => {
      // Divided by this huge number in order to get the real value.. should find a better way to do this!
      this.price_change_24h = this._marketComponent.price_change_24h;
      this.price_change_percentage_24h = this._marketComponent.price_change_percentage_24h;
      this.balance = this.roundTo(data["balance"]/1000000000000000000 as number,2);
      this.value = this.roundTo(this.balance * this._marketComponent.current_price,2);
      this.transactions_number = data["n_tx"];
      this.unconfirmed_transactions_number = data["unconfirmed_n_tx"];
      this.qr_url = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+this.adress+"&choe=UTF-8";

      this.adressIsValid = true;
      this.loading = false;
      }, error =>{
        if(error.statusText == "OK"){
          this.error = true;
          this.severeError = false;
          this.adressIsValid = false;

          this.loading = false;
        }else{
          this.errorMessage = error.statusText + "(" + error.message + ")";
          this.severeError = true;
          this.error = false;
          this.adressIsValid = false;
        }
      });
    }else{
      this.error = true;
      this.loading = false;
    }
  }

  public openCamera(event:any):void{
    this.scanSuccessful = false;
    this.cameraEnabled = true;
  }

  public takePhoto(resultString:string){
    this.closeModal.nativeElement.click()
    this.cameraEnabled = false;
    this.adress = resultString;
    this.scanSuccessful = true;
    this.loadAdressData(this.adress);
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
