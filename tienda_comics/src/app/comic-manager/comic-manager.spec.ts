import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicManager } from './comic-manager';

describe('ComicManager', () => {
  let component: ComicManager;
  let fixture: ComponentFixture<ComicManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
