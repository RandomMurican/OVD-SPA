/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VmComponent } from './vm.component';

describe('VmComponent', () => {
  let component: VmComponent;
  let fixture: ComponentFixture<VmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
