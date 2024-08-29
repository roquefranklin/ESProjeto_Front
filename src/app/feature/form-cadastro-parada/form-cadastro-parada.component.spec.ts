import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroParadaComponent } from './form-cadastro-parada.component';

describe('DialogMessageComponent', () => {
  let component: FormCadastroParadaComponent;
  let fixture: ComponentFixture<FormCadastroParadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroParadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroParadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
