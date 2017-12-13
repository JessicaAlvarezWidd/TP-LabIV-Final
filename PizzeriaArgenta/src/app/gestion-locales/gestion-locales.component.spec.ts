import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLocalesComponent } from './gestion-locales.component';

describe('GestionLocalesComponent', () => {
  let component: GestionLocalesComponent;
  let fixture: ComponentFixture<GestionLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
