import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCustomerSaleStep } from './search-customer-sale-step';

describe('SearchCustomerSaleStep', () => {
  let component: SearchCustomerSaleStep;
  let fixture: ComponentFixture<SearchCustomerSaleStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCustomerSaleStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCustomerSaleStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
