import { Component, OnInit } from '@angular/core';
import { DataService } from './../vitrage-api/topology/data.service';
import { GridOptions } from 'ag-grid/main';

//declare var d3;
declare var moment: any;

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
  private criticalAlarmsCounter: number;
  private warningAlarmsCounter: number;
  private naAlarmsCounter: number;
  private okAlarmsCounter: number;
  private isLoading: boolean;

  constructor(private _dataService: DataService) {
    this.gridOptions = {
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      enableStatusBar: true,
      columnDefs: [
        {
          headerName: "Time", field: "update_timestamp",
          width: 150, pinned: true,
          cellRenderer: this.timeCellRenderer
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
          headerName: "Severity", field: "aggregated_severity",
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
    this.getAlarms();
  }

  timeCellRenderer(params) {
    return `<span>${moment(params.value).format('lll')}</span>`;
  }

  private getAlarms() {
    this.isLoading = true;

    this._dataService.getAlarms()
      .subscribe(
      res => {
        this.createRowData(res.json());
        this.isLoading = false;
      },
      err => {
        console.error(err)
        this.isLoading = true;
      });

  }

  private createRowData(data: Array<any>) {
    var rowData: any[] = [];
    this.criticalAlarmsCounter = 0;
    this.warningAlarmsCounter = 0
    this.naAlarmsCounter = 0;
    this.okAlarmsCounter = 0;

    for (var i = 0; i < data.length; i++) {
      rowData.push({
        "aggregated_severity": data[i].aggregated_severity, "category": data[i].category, "is_deleted": data[i].is_deleted,
        "is_placeholder": data[i].is_placeholder, "name": data[i].name,
        "operational_severity": data[i].operational_severity, "rawtext": data[i].rawtext,
        "resource_id": data[i].resource_id, "resource_type": data[i].resource_type, "sample_timestamp": data[i].sample_timestamp,
        "severity": data[i].severity, "state": data[i].state, "type": data[i].type, "update_timestamp": data[i].update_timestamp,
        "vitrage_id": data[i].vitrage_id
      });

      switch (data[i].operational_severity) {
        case 'CRITICAL':
        case 'SEVERE':
          this.criticalAlarmsCounter++;
          break;
        case 'WARNING':
          this.warningAlarmsCounter++;
          break;
        case 'OK':
          this.okAlarmsCounter++;
          break;
        case 'N/A':
          this.naAlarmsCounter++;
          break;
      }
    }

    this.gridOptions.api.setRowData(rowData);
    this.showGrid = true;
  }

}
