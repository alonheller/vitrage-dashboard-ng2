import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginService } from './../../auth/login-service/login.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private _http: Http;
  private _loginService: LoginService;

  constructor(http: Http, loginService: LoginService) {
    this._http = http;
    this._loginService = loginService;
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', this._loginService.getToken());
  }

  private get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this._http.get(this._loginService.getVitrageUrl() + url, { headers: headers });
  }

  private post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this._http.post(this._loginService.getVitrageUrl() + url, data, { headers: headers });
  }

  getTopology() {
    //let data = {"graph_type": "graph", "depth": null, "root": null, "all_tenants": 0, "query": null};

    let data = { "graph_type": "tree", "depth": null, "root": null, "all_tenants": 0, "query": "{\"and\": [{\"==\": {\"category\": \"RESOURCE\"}}, {\"==\": {\"is_deleted\": false}}, { \"==\": {\"is_placeholder\": false}}, {\"or\": [{\"==\": {\"type\": \"openstack.cluster\"}}, {\"==\": {\"type\": \"nova.instance\"}}, {\"==\": {\"type\": \"nova.host\"}}, {\"==\": {\"type\": \"nova.zone\"}}]}]}" }


    this.post('/v1/topology', data)
      .subscribe(
      res => console.log('Success: ', res),
      err => console.error(err));
  }

  getAlarms() {
    let url = `/v1/alarm/all`;

    this.get(url)
      .subscribe(
      res => console.log('Success: ', res),
      err => console.error(err));

  }
  /* getTopology
{"directed": true, "graph": {}, "nodes": [{"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "openstack.cluster", "graph_index": 0, "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:openstack.cluster", "type": "openstack.cluster", "id": "openstack.cluster"}, {"is_placeholder": false, "vitrage_id": "RESOURCE:neutron.network:c38b40fd-6d66-4137-bb82-6a76040b5e3b", "is_deleted": false, "name": "public", "update_timestamp": "2016-11-28T15:00:03Z", "sample_timestamp": "2016-11-28 15:09:49.595893+00:00", "operational_state": "OK", "aggregated_state": "ACTIVE", "state": "ACTIVE", "id": "c38b40fd-6d66-4137-bb82-6a76040b5e3b", "project_id": "08e5a88e62b9413abbfd7e900272f8b4", "type": "neutron.network", "graph_index": 1, "category": "RESOURCE"}, {"is_placeholder": false, "vitrage_id": "RESOURCE:nova.instance:b1f125b5-223f-48ca-a40f-7c3a2d2e0b55", "is_deleted": false, "name": "spgw_1_1", "update_timestamp": "2016-11-28 15:09:23.023227+00:00", "sample_timestamp": "2016-11-28 15:09:23.023227+00:00", "operational_state": "OK", "aggregated_state": "ACTIVE", "state": "ACTIVE", "id": "b1f125b5-223f-48ca-a40f-7c3a2d2e0b55", "category": "RESOURCE", "type": "nova.instance", "graph_index": 2}, {"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "devstack", "update_timestamp": "2016-11-28 15:09:46.942452+00:00", "sample_timestamp": "2016-11-28 15:09:52.360027+00:00", "id": "devstack", "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:nova.host:devstack", "type": "nova.host", "graph_index": 3}, {"category": "RESOURCE", "is_placeholder": false, "is_deleted": false, "name": "nova", "update_timestamp": "2016-11-28 15:09:52.360027+00:00", "sample_timestamp": "2016-11-28 15:09:52.360027+00:00", "id": "nova", "operational_state": "OK", "aggregated_state": "AVAILABLE", "state": "available", "vitrage_id": "RESOURCE:nova.zone:nova", "type": "nova.zone", "graph_index": 4}], "links": [{"relationship_type": "contains", "source": 0, "is_deleted": false, "target": 4, "key": "contains"}, {"relationship_type": "contains", "source": 4, "is_deleted": false, "target": 3, "key": "contains"}], "multigraph": true}
*/
}
