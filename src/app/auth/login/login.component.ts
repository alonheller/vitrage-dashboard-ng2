import { Component } from '@angular/core';

import { LoginService } from '../login-service/login.service';
import { Login } from './../../models/login';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private _loginService: LoginService;
  private _model: Login;
  private _loading: boolean = false;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
    this.initModel();
  }

  login() {
    this._loginService.login(this._model);
  }

  initModel() {
    this._model = new Login("admin", "password", "135.248.18.33", "5000", "admin", false);
  }

}
