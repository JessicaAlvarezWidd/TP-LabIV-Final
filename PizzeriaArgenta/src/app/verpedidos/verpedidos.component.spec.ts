import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpedidosComponent } from './verpedidos.component';

describe('VerpedidosComponent', () => {
  let component: VerpedidosComponent;
  let fixture: ComponentFixture<VerpedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerpedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
