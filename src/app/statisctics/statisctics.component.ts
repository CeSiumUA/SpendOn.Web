import { Component, OnInit } from '@angular/core';
import { ApifetcherService } from '../../services/apifetcher.service';
import { StoredTransactionModel } from '../../models/stored.transaction';

@Component({
  selector: 'app-statisctics',
  templateUrl: './statisctics.component.html',
  styleUrls: ['./statisctics.component.css']
})
export class StatiscticsComponent implements OnInit {

  loadedTransactions: StoredTransactionModel[] = []
  constructor(private apiFetcherService: ApifetcherService) {

  }

  ngOnInit(): void {
    this.apiFetcherService.getFilteredTransactions().subscribe(rslt => {
      this.loadedTransactions = rslt
    })
  }

}
