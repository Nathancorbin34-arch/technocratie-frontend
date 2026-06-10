import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Personnalisation } from './personnalisation';

describe('Personnalisation', () => {
  let component: Personnalisation;
  let fixture: ComponentFixture<Personnalisation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Personnalisation],
    }).compileComponents();

    fixture = TestBed.createComponent(Personnalisation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
