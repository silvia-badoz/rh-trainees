import { TestBed } from '@angular/core/testing';

import { ColorSchemeServiceService } from './color-scheme-service.service';

describe('ColorSchemeServiceService', () => {
  let service: ColorSchemeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorSchemeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
