import { TestBed, inject } from '@angular/core/testing';

import { VerificarjwtService } from './verificarjwt.service';

describe('VerificarjwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarjwtService]
    });
  });

  it('should be created', inject([VerificarjwtService], (service: VerificarjwtService) => {
    expect(service).toBeTruthy();
  }));
});
