import { TestBed } from '@angular/core/testing';

import { FormCadastroParadaService } from './form-cadastro-parada.service';

describe('FormCadastroParadaService', () => {
  let service: FormCadastroParadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCadastroParadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
