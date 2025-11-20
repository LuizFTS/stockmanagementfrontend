import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTaxId } from './supplier-tax-id';

describe('SupplierTaxId', () => {
  let component: SupplierTaxId;
  let fixture: ComponentFixture<SupplierTaxId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierTaxId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierTaxId);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
