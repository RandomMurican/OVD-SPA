/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VmService } from './vm.service';

describe('Service: Vm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VmService]
    });
  });

  it('should ...', inject([VmService], (service: VmService) => {
    expect(service).toBeTruthy();
  }));
});
