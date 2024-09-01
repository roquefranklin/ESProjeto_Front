import { TestBed } from '@angular/core/testing';

import { GenerateMapsService } from './generate-maps.service';

describe('GenerateMapsService', () => {
  let service: GenerateMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
