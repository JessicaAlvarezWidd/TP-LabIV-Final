import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaUsuariosComponent } from './alta-usuarios.component';

describe('AltaUsuariosComponent', () => {
  let component: AltaUsuariosComponent;
  let fixture: ComponentFixture<AltaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
