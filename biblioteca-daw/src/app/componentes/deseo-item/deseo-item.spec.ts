import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseoItem } from './deseo-item';

describe('DeseoItem', () => {
  let component: DeseoItem;
  let fixture: ComponentFixture<DeseoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeseoItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DeseoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
