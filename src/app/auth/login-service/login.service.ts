import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Login } from './../../models/login';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  
  private _vitrageUrl:string;
  private _token:string;

  constructor(private _http: Http, private _router:Router) { }

  login(login:Login) {
    let url = `http://${login.openstackServerIp}:${login.port}${!login.isLiberty ? '/identity' : ''}/v2.0/tokens`;
    let body = {"auth":{"passwordCredentials": {"password":login.password,"username":login.username}, "tenantName": login.tenant}};

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
      
    })
    .subscribe(      
      res => this._router.navigate(['/topology']),
      err => console.error(err));
  }

  getVitrageUrl() {
    return this._vitrageUrl;
  }

  getToken() {
    return this._token;
  }


/* login
{"access": {"token": {"issued_at": "2016-11-28T14:10:24.000000Z", "expires": "2016-11-28T15:10:24.000000Z", "id": "gAAAAABYPDrQrcUAk9aTwdyOZnz-wqS3gqM0URreZIOvBuV48AlZhjy-Q7040jvZDtyPNzSLJgqHpYi2bm-itxTZaasmJ5ZHLqKtn3zDYYuUum7mtxXZ2qvUx6xGTzRtloSpu_CDVrpwG4rIgxuRqDCbo0VluI2UZUwN7RK5a_uTQUeRvTvx4-E", "tenant": {"description": "Bootstrap project for initializing the cloud.", "enabled": true, "id": "7924bafbd7054d58abfd7eb4604df7a1", "name": "admin"}, "audit_ids": ["Kn-Dgv_fQoyHUHQkTCDCCg"]}, "serviceCatalog": [{"endpoints": [{"adminURL": "http://127.0.0.1:8774/v2.1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8774/v2.1", "id": "16a824675ce9433bb52b3a81f21d9336", "publicURL": "http://127.0.0.1:8774/v2.1"}], "endpoints_links": [], "type": "compute", "name": "nova"}, {"endpoints": [{"adminURL": "http://127.0.0.1:9696/", "region": "RegionOne", "internalURL": "http://127.0.0.1:9696/", "id": "7761286a71404705a68d5855eea626db", "publicURL": "http://127.0.0.1:9696/"}], "endpoints_links": [], "type": "network", "name": "neutron"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1", "id": "45a95ff34e2b490395b1f3f8b6c7944a", "publicURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volumev2", "name": "cinderv2"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1", "id": "4f1be04990744f289165a1c8a60c1f6a", "publicURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volumev3", "name": "cinderv3"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8042", "region": "RegionOne", "internalURL": "http://127.0.0.1:8042", "id": "6cf0c4d584494a99b921b4422e246319", "publicURL": "http://127.0.0.1:8042"}], "endpoints_links": [], "type": "alarming", "name": "aodh"}, {"endpoints": [{"adminURL": "http://127.0.0.1:9292", "region": "RegionOne", "internalURL": "http://127.0.0.1:9292", "id": "0c437af6719f4dec854c15f51cbff5a3", "publicURL": "http://127.0.0.1:9292"}], "endpoints_links": [], "type": "image", "name": "glance"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1", "id": "123d93dff78f4a9db17d908b1fd8a000", "publicURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "compute_legacy", "name": "nova_legacy"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8000/v1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8000/v1", "id": "01ed7da7af034e9bb996764f0ca887d5", "publicURL": "http://127.0.0.1:8000/v1"}], "endpoints_links": [], "type": "cloudformation", "name": "heat-cfn"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8777", "region": "RegionOne", "internalURL": "http://127.0.0.1:8777", "id": "2380faa1c3ba4af287bd6790d2aa665e", "publicURL": "http://127.0.0.1:8777"}], "endpoints_links": [], "type": "metering", "name": "ceilometer"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1", "id": "4111bd25396149d6be7cec7d1608b6b4", "publicURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volume", "name": "cinder"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1", "id": "12264dbd2d424a18ae2e438d783f706f", "publicURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "orchestration", "name": "heat"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8999", "region": "RegionOne", "internalURL": "http://127.0.0.1:8999", "id": "03ae990091e14dc49f0f18bc38074d4f", "publicURL": "http://127.0.0.1:8999"}], "endpoints_links": [], "type": "rca", "name": "vitrage"}, {"endpoints": [{"adminURL": "http://127.0.0.1/identity_admin", "region": "RegionOne", "internalURL": "http://127.0.0.1/identity", "id": "1b930fff21504660b23c8aa1fa3eed7d", "publicURL": "http://127.0.0.1/identity"}], "endpoints_links": [], "type": "identity", "name": "keystone"}], "user": {"username": "admin", "roles_links": [], "id": "99db09a0f7664053893492503e701af6", "roles": [{"name": "admin"}], "name": "admin"}, "metadata": {"is_admin": 0, "roles": ["7649b971894d41828743ba8e8fbe14b1"]}}}
 */

}
