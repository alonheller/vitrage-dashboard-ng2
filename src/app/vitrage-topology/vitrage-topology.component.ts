import { Component, OnInit } from '@angular/core';
import { DataService } from './../vitrage-api/topology/data.service';
import { GridOptions } from 'ag-grid/main';

declare var d3;

@Component({
  selector: 'vitrage-topology',
  templateUrl: './vitrage-topology.component.html',
  styleUrls: ['./vitrage-topology.component.css']
})
export class VitrageTopologyComponent implements OnInit {

  public showGrid: boolean;
  private gridOptions: GridOptions;
  public rowData: any[];
  private columnDefs: any[];

  constructor(private _dataService: DataService) {
    this.gridOptions = {
      columnDefs: [
        {
          headerName: "Time", field: "update_timestamp",
          width: 150, pinned: true
        },
        {
          headerName: "Name", field: "name",
          width: 150, pinned: true
        },
        {
          headerName: "Resource Type", field: "resource_type",
          width: 150, pinned: true
        },
        {
          headerName: "Resource ID", field: "resource_id",
          width: 150, pinned: true
        },
        {
          headerName: "Severity", field: "operational_severity",
          width: 150, pinned: true
        },
        {
          headerName: "Type", field: "type",
          width: 150, pinned: true
        }


      ]
    };
  }

  ngOnInit() {
    //this.drawD3();
    //this.createRowData();
    //this.showGrid = true;

    this._dataService.getAlarms()
      .subscribe(
      res => {
        this.createRowData(res.json());
      },
      err => console.error(err));
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

  private createRowData(data:Array<any>) {
    var rowData: any[] = [];

    for (var i = 0; i < data.length; i++) {
      rowData.push({
        "aggregated_severity": data[i].aggregated_severity, "category": data[i].category, "is_deleted": data[i].is_deleted,
        "is_placeholder": data[i].is_placeholder, "name": data[i].name,
        "operational_severity": data[i].operational_severity, "rawtext": data[i].rawtext,
        "resource_id": data[i].resource_id, "resource_type": data[i].resource_type, "sample_timestamp": data[i].sample_timestamp,
        "severity": data[i].severity, "state": data[i].state, "type": data[i].type, "update_timestamp": data[i].update_timestamp,
        "vitrage_id": data[i].vitrage_id
      });
    }

    this.gridOptions.api.setRowData(rowData);
  }

}
