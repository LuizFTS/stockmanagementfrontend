import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleHistoryPage } from './sale-history-page';

describe('SaleHistoryPage', () => {
  let component: SaleHistoryPage;
  let fixture: ComponentFixture<SaleHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleHistoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
