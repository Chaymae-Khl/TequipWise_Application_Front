import { TestBed } from '@angular/core/testing';

import { OpenDataServiceService } from './open-data-service.service';

describe('OpenDataServiceService', () => {
  let service: OpenDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
