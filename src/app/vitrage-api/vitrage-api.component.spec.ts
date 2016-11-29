/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VitrageApiComponent } from './vitrage-api.component';

describe('VitrageApiComponent', () => {
  let component: VitrageApiComponent;
  let fixture: ComponentFixture<VitrageApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitrageApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitrageApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
