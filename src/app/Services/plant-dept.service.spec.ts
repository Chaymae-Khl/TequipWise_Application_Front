import { TestBed } from '@angular/core/testing';

import { PlantDeptService } from './plant-dept.service';

describe('PlantDeptService', () => {
  let service: PlantDeptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantDeptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
