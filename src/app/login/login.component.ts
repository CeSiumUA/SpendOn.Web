import { Component, OnInit } from '@angular/core';
import { ApifetcherService } from 'src/services/apifetcher.service';
import { LoginRequest } from '../../models/login.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public userName: string = '';
  public password: string = '';

  constructor(private apifetcherService: ApifetcherService) {

  }

  login(){
    const loginRequest: LoginRequest = {
      UserName: this.userName,
      Password: this.password
    }
    this.apifetcherService.login(loginRequest)
  }

  ngOnInit(): void {
  }

}
