import { Component, OnInit } from '@angular/core';
import { ApifetcherService } from '../../services/apifetcher.service';
import { StoredTransactionModel, DisplayTransactonModel } from '../../models/stored.transaction';
import { CategoryStat, Category } from '../../models/category';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-statisctics',
  templateUrl: './statisctics.component.html',
  styleUrls: ['./statisctics.component.css']
})
export class StatiscticsComponent implements OnInit {

  loadedTransactions: DisplayTransactonModel[] = [];
  categorySummaries: CategoryStat[] = [];
  categoriesMapping: Category[] = [];

  polarChartLegend = true;
  lineChartType: ChartType = 'radar';

  chartOptions: ChartOptions = {}

  chartDataSet: ChartDataSets[] = [];

  chartDataLabels: Label[] = [];

  constructor(private apiFetcherService: ApifetcherService, private matSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.categoriesMapping = this.apiFetcherService.getCategories()
    this.apiFetcherService.getStatistics().subscribe(rslt => {
      this.categorySummaries = rslt;
      this.chartDataSet = [{data: this.categorySummaries.map(x => x.Sum), label: 'Main'}];
      this.chartDataLabels = this.categorySummaries.map(x => this.categoriesMapping.filter(y => y.Id == x.CategoryId)[0].Name);
    });
    this.apiFetcherService.getFilteredTransactions().subscribe(rslt => {
      const arr: DisplayTransactonModel[] = rslt;
      this.loadedTransactions = arr.map(x => {
        return {
          Id: x.Id,
          Amount: x.Amount,
          SpentAt: x.SpentAt,
          Note: x.Note,
          CategoryId: x.CategoryId,
          CategoryName: this.categoriesMapping.filter(y => y.Id == x.CategoryId)[0].Name
        }
      });
    });
  }

  removeTransaction(id: number): void {
    this.apiFetcherService.removeTransaction(id).subscribe(result => {
      this.matSnackBar.open('Transaction removed successfully!');
    }, err => {
      this.matSnackBar.open('Failed to remove transaction!')
    });
  }
}
