import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenaItem } from './resena-item';

describe('ResenaItem', () => {
  let component: ResenaItem;
  let fixture: ComponentFixture<ResenaItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenaItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ResenaItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
