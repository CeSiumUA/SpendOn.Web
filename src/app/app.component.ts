import { Component } from '@angular/core';
import { ApifetcherService } from '../services/apifetcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'spendon';

  get isOffline(): boolean{
    return !this.apifetcherService.IsOnline
  }

  constructor(private apifetcherService: ApifetcherService){}
}
