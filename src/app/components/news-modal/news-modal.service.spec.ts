import { TestBed } from '@angular/core/testing';

import { NewsModalService } from './news-modal.service';

describe('NewsModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsModalService = TestBed.get(NewsModalService);
    expect(service).toBeTruthy();
  });
});
