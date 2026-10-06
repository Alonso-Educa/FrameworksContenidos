import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoItem } from './juego-item';

describe('JuegoItem', () => {
  let component: JuegoItem;
  let fixture: ComponentFixture<JuegoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoItem],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
