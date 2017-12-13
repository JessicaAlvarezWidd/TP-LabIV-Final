import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductosComponent } from './alta-productos.component';

describe('AltaProductosComponent', () => {
  let component: AltaProductosComponent;
  let fixture: ComponentFixture<AltaProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
