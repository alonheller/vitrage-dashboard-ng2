import { Component, OnInit } from '@angular/core';
import { DataService } from './../vitrage-api/topology/data.service';

@Component({
  selector: 'vitrage-topology',
  templateUrl: './vitrage-topology.component.html',
  styleUrls: ['./vitrage-topology.component.css']
})
export class VitrageTopologyComponent implements OnInit {

  constructor(private _dataService:DataService) { }

  ngOnInit() {
  }

  onGetTopology() {
    this._dataService.getTopology();
  }
}
