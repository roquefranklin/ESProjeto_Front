import { TestBed } from '@angular/core/testing';

import { BottomMenuManagerService } from './bottom-menu-manager.service';

describe('BottomMenuManagerService', () => {
  let service: BottomMenuManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottomMenuManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
