import { Component, OnInit } from '@angular/core';
import { DataService } from './../vitrage-api/topology/data.service';

declare var d3;

@Component({
  selector: 'vitrage-topology',
  templateUrl: './vitrage-topology.component.html',
  styleUrls: ['./vitrage-topology.component.css']
})
export class VitrageTopologyComponent implements OnInit {

 

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.drawD3();
  }

  onGetTopology() {
    this._dataService.getTopology();
  }

  onGetAlarms() {
    this._dataService.getAlarms();    
  }

  private drawD3() {
   d3.select("svg").append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", 100)     // x position of the first end of the line
    .attr("y1", 50)      // y position of the first end of the line
    .attr("x2", 300)     // x position of the second end of the line
    .attr("y2", 150);
  }




}
