import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApifetcherService } from '../../services/apifetcher.service';
import { StoredTransactionModel, DisplayTransactonModel } from '../../models/stored.transaction';
import { CategoryStat, Category } from '../../models/category';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { filter, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagedTransactions } from '../../models/paged.transactions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FilterSettings, Sign, Field, FilterSelector, Filter } from '../../models/filters';

@Component({
  selector: 'app-statisctics',
  templateUrl: './statisctics.component.html',
  styleUrls: ['./statisctics.component.css']
})
export class StatiscticsComponent implements OnInit {

  filterSettings: FilterSettings = {
    Fields: [],
    Signs : []
  }
  loadedTransactions: DisplayTransactonModel[] = [];
  categorySummaries: CategoryStat[] = [];
  categoriesMapping: Category[] = [];

  polarChartLegend = true;
  lineChartType: ChartType = 'radar';

  currentPageNumber: number = 0;

  itemsPerPage: number = 10;

  itemsCount: number = 0;

  chartOptions: ChartOptions = {}

  chartDataSet: ChartDataSets[] = [];

  chartDataLabels: Label[] = [];

  fieldIndex: number | undefined;

  signIndex: number | undefined;

  filterValue: string | undefined;

  currentFilters: Filter[] = []

  constructor(private apiFetcherService: ApifetcherService, private matSnackBar: MatSnackBar) {

  }

  pageChangedHandler(event?: PageEvent){
    if(event){
      this.fetchTransactions(event.pageIndex, event.pageSize)
    }
  }

  fetchTransactions(pageNumber: number, items: number){
    this.apiFetcherService.getFilteredTransactions(pageNumber, items, this.currentFilters).subscribe(rslt => {
      const pagedTransactions: PagedTransactions = rslt;
      this.itemsCount = pagedTransactions.Count
      this.loadedTransactions = pagedTransactions.Transactions.map(x => {
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

  convertOperatorToSign(index: number): string{
    return this.filterSettings.Signs.filter(x => x.index == index)[0].value
  }

  convertPropertyToField(index: number): string{
    return this.filterSettings.Fields.filter(x => x.index == index)[0].value
  }

  applyFilter() {
    if(this.fieldIndex !== undefined
      && this.signIndex !== undefined
      && this.filterValue !== undefined){
      const newFilter: Filter = {
        Property: this.fieldIndex,
        Value: this.filterValue,
        Operator: this.signIndex
      }
      this.currentFilters.push(newFilter)
      this.fetchTransactions(this.currentPageNumber, this.itemsPerPage)
      this.fieldIndex = undefined;
      this.filterValue = undefined;
      this.signIndex = undefined;
    }
  }

  removeFilter(filter: Filter){
    const indexToRemove = this.currentFilters.indexOf(filter)
    if(indexToRemove > -1) {
      this.currentFilters.splice(indexToRemove, 1)
    }
    this.fetchTransactions(this.currentPageNumber, this.itemsPerPage)
  }

  ngOnInit(): void {
    this.categoriesMapping = this.apiFetcherService.getCategories()
    this.apiFetcherService.getStatistics().subscribe(rslt => {
      this.categorySummaries = rslt;
      this.chartDataSet = [{data: this.categorySummaries.map(x => x.Sum), label: 'Main'}];
      this.chartDataLabels = this.categorySummaries.map(x => this.categoriesMapping.filter(y => y.Id == x.CategoryId)[0].Name);
    });
    this.fetchTransactions(this.currentPageNumber, this.itemsPerPage)
    this.apiFetcherService.getFilterSettings().subscribe(result => {
      this.filterSettings = result
    }, err => {
      this.filterSettings = JSON.parse(localStorage.getItem('filtersettings') ?? '{}')
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
