import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLocalesComponent } from './alta-locales.component';

describe('AltaLocalesComponent', () => {
  let component: AltaLocalesComponent;
  let fixture: ComponentFixture<AltaLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
