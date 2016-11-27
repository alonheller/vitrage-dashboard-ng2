import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private _http:Http;

  constructor(private http: Http) {
    this._http = http;
  }

  login(user:string, password:string, tenantName:string, ip:string, port: string, isLiberty:boolean) {
    let url = `http://${ip}:${port}${!isLiberty ? '/identity' : ''}/v2.0/tokens`;
    let body = {"auth":{"passwordCredentials": {"password":password,"username":user}, "tenantName": tenantName}};

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    this._http.post(url, body, {headers: headers})
    .subscribe(
      res => console.log('Success: ', res),
      err => this.logError(err));
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

}
