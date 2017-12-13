import { TestBed, inject } from '@angular/core/testing';

import { FbserviceService } from './fbservice.service';

describe('FbserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbserviceService]
    });
  });

  it('should be created', inject([FbserviceService], (service: FbserviceService) => {
    expect(service).toBeTruthy();
  }));
});
