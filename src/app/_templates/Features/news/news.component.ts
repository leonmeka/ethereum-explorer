import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DataService } from 'src/app/_services/data-service';
import { AppUtilities } from 'src/app/_utilities/AppUtilities';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Object[];

  severeError: boolean;
  error: boolean;
  errorMessage: string;

  loading: boolean;

  constructor(private _dataService: DataService, private _electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.loadNews();
    this.articles = [];
  }

  public loadNews() {
    this.loading = true;
    this.error = false;
    this.severeError = false;

    this._dataService.getNewsData().subscribe((_data) => {
      this.articles = _data["results"][0]["results"];

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
      }
    });
  }

  public goToUrl(adr: string) {
    //this._electronService.ipcRenderer.send("externalLink", adr);
    window.open(adr, "_blank");
  }
}
