import { TestBed } from '@angular/core/testing';

import { BodyScrollingService } from './body-scrolling.service';

describe('BodyScrollingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodyScrollingService = TestBed.get(BodyScrollingService);
    expect(service).toBeTruthy();
  });
});
