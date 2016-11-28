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
    .map((res:any) => {
      
        let result = JSON.parse(res._body);
        let token = result.access.token.id;
        let vitrageURL = '';

        result.access.serviceCatalog.forEach(element => {
          if (element.name === 'vitrage') {
            vitrageURL = element.endpoints[0].publicURL;            
          }
        });
        // ---- TODO: Remove
        vitrageURL = 'http://135.248.19.82:8999';
        // ---- TODO: Remove

        return {token: token, vitrageURL: vitrageURL};
      
    })
    .subscribe(
      res => console.log('Success: ', res),
      err => this.logError(err));
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

}
