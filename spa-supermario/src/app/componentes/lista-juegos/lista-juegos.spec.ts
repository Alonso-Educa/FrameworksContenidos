import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaJuegos } from './lista-juegos';

describe('ListaJuegos', () => {
  let component: ListaJuegos;
  let fixture: ComponentFixture<ListaJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaJuegos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaJuegos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
