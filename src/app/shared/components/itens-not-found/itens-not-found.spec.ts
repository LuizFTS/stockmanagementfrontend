import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensNotFound } from './itens-not-found';

describe('ItensNotFound', () => {
  let component: ItensNotFound;
  let fixture: ComponentFixture<ItensNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
