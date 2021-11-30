import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { LoginRequest } from '../models/login.request';
import { Observable, of } from 'rxjs';
import { AuthToken } from '../models/auth.token';
import { map } from 'rxjs/operators'
import { AddTransactionModel } from '../models/add.transaction';
import { StoredTransactionModel } from '../models/stored.transaction';

@Injectable({
  providedIn: 'root'
})
export class ApifetcherService {

  public IsOnline: boolean = window.navigator.onLine

  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.fetchCategories()
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    window.addEventListener('online', () => {
      this.IsOnline = true
    });
    window.addEventListener('offline', () => {
      this.IsOnline = false
    });
  }
  getCategories(): Category[] {
    return JSON.parse(localStorage.getItem('categories') ?? '[]')
  }
  fetchCategories(){
    this.httpClient.get(`${environment.apiUrl}/getcategories`, {headers: this.headers}).subscribe(reslt => {
      localStorage.setItem('categories', JSON.stringify(reslt))
    })
  }
  login(loginRequest: LoginRequest): Observable<void> {
    return this.httpClient.post(`${environment.apiUrl}/login`, loginRequest, {headers: this.headers}).pipe(map((data: any, index: number) => {
      if(data !== null && data !== undefined){
        localStorage.setItem('authToken', JSON.stringify(data))
      }
    }))
  }
  removeTransaction(id: number): Observable<Object>{
    this.setToken()
    return this.httpClient.delete(`${environment.apiUrl}/removetransaction`, {headers: this.headers, body: {
      TransactionId: id
    }})
  }
  checkAuth(): Observable<Object> {
    this.setToken()
    return this.httpClient.get(`${environment.apiUrl}/checkauth`, {headers: this.headers});
  }
  bulkAddTransactions(transactions: AddTransactionModel[]): Observable<Object> {
    this.setToken()
    return this.httpClient.post(`${environment.apiUrl}/bulkadd`, transactions, { headers: this.headers})
  }
  bulkAddStoredTransactions(): Observable<Object> {
    this.setToken()
    const transactions: AddTransactionModel[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')
    return this.bulkAddTransactions(transactions)
  }
  getFilteredTransactions(pageNumber: number, pagination: number): Observable<any> {
    this.setToken()
    return this.httpClient.post(`${environment.apiUrl}/fetchtransactions`, {
      "PageNumber": pageNumber,
      "Pagination": pagination
    }, {headers: this.headers})
  }
  getStatistics(): Observable<any> {
    this.setToken()
    return this.httpClient.post(`${environment.apiUrl}/getcategoriesstats`, {}, { headers: this.headers })
  }
  private setToken(): void{
    const localStorageValue = localStorage.getItem('authToken')
    const authToken: AuthToken = localStorageValue === null ? {Token: ''} : JSON.parse(localStorageValue);
    this.headers = this.headers.set('Token', authToken.Token)
  }
}
