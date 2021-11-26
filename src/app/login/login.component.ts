import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApifetcherService } from 'src/services/apifetcher.service';
import { LoginRequest } from '../../models/login.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public userName: string = '';
  public password: string = '';

  public error: string | null = null;

  constructor(private apifetcherService: ApifetcherService, private router: Router) {

  }

  login(){
    const loginRequest: LoginRequest = {
      UserName: this.userName,
      Password: this.password
    }
    this.apifetcherService.login(loginRequest).subscribe(result => {
      this.error = null;
      this.router.navigate(['/']);
    }, err => {
      this.error = "Login failed!"
    })
  }

  ngOnInit(): void {
  }

}
