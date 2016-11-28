import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private _http:Http;
  private _vitrageUrl:string;
  private _token:string;

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
        this._token = result.access.token.id;        

        result.access.serviceCatalog.forEach(element => {
          if (element.name === 'vitrage') {
            this._vitrageUrl = element.endpoints[0].publicURL;            
          }
        });
        // ---- TODO: Remove
        this._vitrageUrl = 'http://135.248.19.82:8999';
        // ---- TODO: Remove

        return {token: this._token, vitrageUrl: this._vitrageUrl};
      
    })
    .subscribe(
      res => console.log('Success: ', res),
      err => this.logError(err));
  }

  getTopology() {
    let body = {"graph_type": "graph", "depth": null, "root": null, "all_tenants": 0, "query": null};

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', this._token);

    this._http.post(this._vitrageUrl + '/v1/topology', body, {headers: headers})
    .subscribe(
      res => console.log('Success: ', res),
      err => this.logError(err));
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

}
