import { TestBed, async, inject } from '@angular/core/testing';

import { SiteDetailGuard } from './site-detail.guard';

describe('SiteDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteDetailGuard]
    });
  });

  it('should ...', inject([SiteDetailGuard], (guard: SiteDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
