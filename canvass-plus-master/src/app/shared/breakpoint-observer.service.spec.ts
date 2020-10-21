import { TestBed } from '@angular/core/testing';

import { BreakpointObserverService } from './breakpoint-observer.service';

describe('BreakpointObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreakpointObserverService = TestBed.get(BreakpointObserverService);
    expect(service).toBeTruthy();
  });
});
