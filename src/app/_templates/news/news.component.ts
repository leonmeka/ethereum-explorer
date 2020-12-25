import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data-service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles:Object[];
  
  severeError:boolean;
  error:boolean;
  errorMessage:string;

  loading:boolean;

  constructor(private _dataService:DataService) { 
    this.loadNews();
    this.articles = [];
  }

  ngOnInit(): void {
  }

  public loadNews(){
    this.loading = true;

    this._dataService.getNewsData().subscribe((_data) => {
      this.articles = _data["articles"]

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
