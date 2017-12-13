import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionLocalesComponent } from './modificacion-locales.component';

describe('ModificacionLocalesComponent', () => {
  let component: ModificacionLocalesComponent;
  let fixture: ComponentFixture<ModificacionLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificacionLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
