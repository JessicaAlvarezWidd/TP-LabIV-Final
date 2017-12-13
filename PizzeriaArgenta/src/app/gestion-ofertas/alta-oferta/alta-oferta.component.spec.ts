import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaOfertaComponent } from './alta-oferta.component';

describe('AltaOfertaComponent', () => {
  let component: AltaOfertaComponent;
  let fixture: ComponentFixture<AltaOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
