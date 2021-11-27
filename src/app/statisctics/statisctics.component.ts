import { Component, OnInit } from '@angular/core';
import { ApifetcherService } from '../../services/apifetcher.service';
import { StoredTransactionModel } from '../../models/stored.transaction';
import { CategoryStat, Category } from '../../models/category';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-statisctics',
  templateUrl: './statisctics.component.html',
  styleUrls: ['./statisctics.component.css']
})
export class StatiscticsComponent implements OnInit {

  loadedTransactions: StoredTransactionModel[] = [];
  categorySummaries: CategoryStat[] = [];
  categoriesMapping: Category[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    
  }

  polarChartLegend = true;
  lineChartType: ChartType = 'polarArea';

  get chartDataSet(): SingleDataSet {
    return this.categorySummaries.map(x => x.Sum);
  }

  get chartDataLabels(): Label[] {
    const labels = this.categorySummaries.map(x => this.categoriesMapping.filter(y => y.Id == x.CategoryId)[0].Name);
    return labels;
  }

  constructor(private apiFetcherService: ApifetcherService) {

  }

  ngOnInit(): void {
    this.categoriesMapping = this.apiFetcherService.getCategories()
    this.apiFetcherService.getStatistics().subscribe(rslt => {
      this.categorySummaries = rslt;
    });
    /*this.apiFetcherService.getFilteredTransactions().subscribe(rslt => {
      this.loadedTransactions = rslt
    });*/
  }

}
