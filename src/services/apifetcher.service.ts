import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { LoginRequest } from '../models/login.request';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/auth.token';

@Injectable({
  providedIn: 'root'
})
export class ApifetcherService {

  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.fetchCategories()
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }
  getCategories(): Category[] {
    return localStorage['categories']
  }
  fetchCategories(){
    this.httpClient.get(`${environment.apiUrl}/getcategories`, {headers: this.headers}).subscribe(reslt => {
      localStorage.setItem('categories', JSON.stringify(reslt))
    })
  }
  login(loginRequest: LoginRequest) {
    this.httpClient.post(`${environment.apiUrl}/login`, loginRequest, {headers: this.headers}).subscribe(result => {
      localStorage.setItem('authToken', JSON.stringify(result))
    })
  }
  checkAuth(): Observable<Object> {
    const localStorageValue = localStorage.getItem('authToken')
    const authToken: AuthToken = localStorageValue === null ? {Token: ''} : JSON.parse(localStorageValue);
    this.headers = this.headers.append('Token', authToken.Token)
    return this.httpClient.get(`${environment.apiUrl}/checkauth`, {headers: this.headers});
  }
}
