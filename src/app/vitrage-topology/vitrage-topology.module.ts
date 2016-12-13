import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VitrageTopologyComponent } from './vitrage-topology.component';
import { AgGridModule } from 'ag-grid-ng2/main';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  declarations: [VitrageTopologyComponent],
  exports: [ VitrageTopologyComponent ]
})
export class VitrageTopologyModule { }
