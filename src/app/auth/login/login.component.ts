import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login-service/login.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginService:LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  ngOnInit() {
  }

  onLogin(user:string, password:string, tenantName:string, ip:string, port:string, isLiberty:boolean) {        
    this._loginService.login(user, password, tenantName, ip, port, isLiberty);
  }

}
