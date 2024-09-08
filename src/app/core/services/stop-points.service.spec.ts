import { TestBed } from '@angular/core/testing';

import { StopPointsService } from './stop-points.service';

describe('StopPointsService', () => {
  let service: StopPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
