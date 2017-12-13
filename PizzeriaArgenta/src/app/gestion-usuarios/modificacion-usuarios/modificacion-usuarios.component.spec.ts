import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionUsuariosComponent } from './modificacion-usuarios.component';

describe('ModificacionUsuariosComponent', () => {
  let component: ModificacionUsuariosComponent;
  let fixture: ComponentFixture<ModificacionUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
