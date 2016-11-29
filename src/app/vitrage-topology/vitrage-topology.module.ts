import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VitrageTopologyComponent } from './vitrage-topology.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VitrageTopologyComponent],
  exports: [ VitrageTopologyComponent ]
})
export class VitrageTopologyModule { }
