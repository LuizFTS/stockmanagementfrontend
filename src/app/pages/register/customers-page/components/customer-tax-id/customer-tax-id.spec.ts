import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTaxId } from './customer-tax-id';

describe('CustomerTaxId', () => {
  let component: CustomerTaxId;
  let fixture: ComponentFixture<CustomerTaxId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTaxId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTaxId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
