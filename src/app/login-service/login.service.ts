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

/* login
{"access": {"token": {"issued_at": "2016-11-28T14:10:24.000000Z", "expires": "2016-11-28T15:10:24.000000Z", "id": "gAAAAABYPDrQrcUAk9aTwdyOZnz-wqS3gqM0URreZIOvBuV48AlZhjy-Q7040jvZDtyPNzSLJgqHpYi2bm-itxTZaasmJ5ZHLqKtn3zDYYuUum7mtxXZ2qvUx6xGTzRtloSpu_CDVrpwG4rIgxuRqDCbo0VluI2UZUwN7RK5a_uTQUeRvTvx4-E", "tenant": {"description": "Bootstrap project for initializing the cloud.", "enabled": true, "id": "7924bafbd7054d58abfd7eb4604df7a1", "name": "admin"}, "audit_ids": ["Kn-Dgv_fQoyHUHQkTCDCCg"]}, "serviceCatalog": [{"endpoints": [{"adminURL": "http://127.0.0.1:8774/v2.1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8774/v2.1", "id": "16a824675ce9433bb52b3a81f21d9336", "publicURL": "http://127.0.0.1:8774/v2.1"}], "endpoints_links": [], "type": "compute", "name": "nova"}, {"endpoints": [{"adminURL": "http://127.0.0.1:9696/", "region": "RegionOne", "internalURL": "http://127.0.0.1:9696/", "id": "7761286a71404705a68d5855eea626db", "publicURL": "http://127.0.0.1:9696/"}], "endpoints_links": [], "type": "network", "name": "neutron"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1", "id": "45a95ff34e2b490395b1f3f8b6c7944a", "publicURL": "http://127.0.0.1:8776/v2/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volumev2", "name": "cinderv2"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1", "id": "4f1be04990744f289165a1c8a60c1f6a", "publicURL": "http://127.0.0.1:8776/v3/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volumev3", "name": "cinderv3"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8042", "region": "RegionOne", "internalURL": "http://127.0.0.1:8042", "id": "6cf0c4d584494a99b921b4422e246319", "publicURL": "http://127.0.0.1:8042"}], "endpoints_links": [], "type": "alarming", "name": "aodh"}, {"endpoints": [{"adminURL": "http://127.0.0.1:9292", "region": "RegionOne", "internalURL": "http://127.0.0.1:9292", "id": "0c437af6719f4dec854c15f51cbff5a3", "publicURL": "http://127.0.0.1:9292"}], "endpoints_links": [], "type": "image", "name": "glance"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1", "id": "123d93dff78f4a9db17d908b1fd8a000", "publicURL": "http://127.0.0.1:8774/v2/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "compute_legacy", "name": "nova_legacy"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8000/v1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8000/v1", "id": "01ed7da7af034e9bb996764f0ca887d5", "publicURL": "http://127.0.0.1:8000/v1"}], "endpoints_links": [], "type": "cloudformation", "name": "heat-cfn"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8777", "region": "RegionOne", "internalURL": "http://127.0.0.1:8777", "id": "2380faa1c3ba4af287bd6790d2aa665e", "publicURL": "http://127.0.0.1:8777"}], "endpoints_links": [], "type": "metering", "name": "ceilometer"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1", "id": "4111bd25396149d6be7cec7d1608b6b4", "publicURL": "http://127.0.0.1:8776/v1/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "volume", "name": "cinder"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1", "region": "RegionOne", "internalURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1", "id": "12264dbd2d424a18ae2e438d783f706f", "publicURL": "http://127.0.0.1:8004/v1/7924bafbd7054d58abfd7eb4604df7a1"}], "endpoints_links": [], "type": "orchestration", "name": "heat"}, {"endpoints": [{"adminURL": "http://127.0.0.1:8999", "region": "RegionOne", "internalURL": "http://127.0.0.1:8999", "id": "03ae990091e14dc49f0f18bc38074d4f", "publicURL": "http://127.0.0.1:8999"}], "endpoints_links": [], "type": "rca", "name": "vitrage"}, {"endpoints": [{"adminURL": "http://127.0.0.1/identity_admin", "region": "RegionOne", "internalURL": "http://127.0.0.1/identity", "id": "1b930fff21504660b23c8aa1fa3eed7d", "publicURL": "http://127.0.0.1/identity"}], "endpoints_links": [], "type": "identity", "name": "keystone"}], "user": {"username": "admin", "roles_links": [], "id": "99db09a0f7664053893492503e701af6", "roles": [{"name": "admin"}], "name": "admin"}, "metadata": {"is_admin": 0, "roles": ["7649b971894d41828743ba8e8fbe14b1"]}}}
 */

/* getTopology
{"directed": true, "graph": {}, "nodes": [{"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "openstack.cluster", "graph_index": 0, "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:openstack.cluster", "type": "openstack.cluster", "id": "openstack.cluster"}, {"is_placeholder": false, "vitrage_id": "RESOURCE:neutron.network:c38b40fd-6d66-4137-bb82-6a76040b5e3b", "is_deleted": false, "name": "public", "update_timestamp": "2016-11-28T15:00:03Z", "sample_timestamp": "2016-11-28 15:09:49.595893+00:00", "operational_state": "OK", "aggregated_state": "ACTIVE", "state": "ACTIVE", "id": "c38b40fd-6d66-4137-bb82-6a76040b5e3b", "project_id": "08e5a88e62b9413abbfd7e900272f8b4", "type": "neutron.network", "graph_index": 1, "category": "RESOURCE"}, {"is_placeholder": false, "vitrage_id": "RESOURCE:nova.instance:b1f125b5-223f-48ca-a40f-7c3a2d2e0b55", "is_deleted": false, "name": "spgw_1_1", "update_timestamp": "2016-11-28 15:09:23.023227+00:00", "sample_timestamp": "2016-11-28 15:09:23.023227+00:00", "operational_state": "OK", "aggregated_state": "ACTIVE", "state": "ACTIVE", "id": "b1f125b5-223f-48ca-a40f-7c3a2d2e0b55", "category": "RESOURCE", "type": "nova.instance", "graph_index": 2}, {"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "devstack", "update_timestamp": "2016-11-28 15:09:46.942452+00:00", "sample_timestamp": "2016-11-28 15:09:52.360027+00:00", "id": "devstack", "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:nova.host:devstack", "type": "nova.host", "graph_index": 3}, {"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "nova", "update_timestamp": "2016-11-28 15:09:52.360027+00:00", "sample_timestamp": "2016-11-28 15:09:52.360027+00:00", "id": "nova", "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:nova.zone:nova", "type": "nova.zone", "graph_index": 4}], "links": [{"relationship_type": "contains", "source": 0, "is_deleted": false, "target": 4, "key": "contains"}, {"relationship_type": "contains", "source": 4, "is_deleted": false, "target": 3, "key": "contains"}], "multigraph": true}
 */
}
