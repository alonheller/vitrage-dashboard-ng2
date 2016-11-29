/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VitrageTopologyComponent } from './vitrage-topology.component';

describe('VitrageTopologyComponent', () => {
  let component: VitrageTopologyComponent;
  let fixture: ComponentFixture<VitrageTopologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitrageTopologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitrageTopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
