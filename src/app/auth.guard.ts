import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApifetcherService } from 'src/services/apifetcher.service';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiFetcher: ApifetcherService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.apiFetcher.IsOnline){
        return true
      }
      return this.apiFetcher.checkAuth().pipe(map((data: any, index: number) => {
        return true;
      }), catchError(err => {
        this.router.navigate(['/login']);
        return of(false)
      }))
  }
  
}
