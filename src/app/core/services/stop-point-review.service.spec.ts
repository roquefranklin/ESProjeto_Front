import { TestBed } from '@angular/core/testing';

import { StopPointReviewService } from './stop-point-review.service';

describe('StopPointReviewService', () => {
  let service: StopPointReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopPointReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
