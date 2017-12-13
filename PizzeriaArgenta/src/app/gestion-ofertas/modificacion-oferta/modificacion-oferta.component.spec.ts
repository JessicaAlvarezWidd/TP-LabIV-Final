import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionOfertaComponent } from './modificacion-oferta.component';

describe('ModificacionOfertaComponent', () => {
  let component: ModificacionOfertaComponent;
  let fixture: ComponentFixture<ModificacionOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
