import { TestBed } from '@angular/core/testing';

import { EmployeBSService } from './employe-bs.service';

describe('EmployeBSService', () => {
  let service: EmployeBSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeBSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
