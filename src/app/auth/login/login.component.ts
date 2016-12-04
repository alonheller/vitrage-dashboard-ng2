import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { Login } from './../../_models/login';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private _loginService: LoginService;
  private _model: Login;
  private _loading: boolean = false;

  constructor(loginService: LoginService,private _router: Router) {
    this._loginService = loginService;
    this.initModel();
  }

  login() {
    this._loading = true;
    this._loginService.login(this._model)
    .subscribe(
      res => {
        this._loading = false;
        this._router.navigate(['/topology'])
      },
      err => {
        this._loading = false;
        console.error(err);
    });
  }

  initModel() {
    this._model = new Login("admin", "password", "135.248.18.33", "5000", "admin", false);
  }

}
