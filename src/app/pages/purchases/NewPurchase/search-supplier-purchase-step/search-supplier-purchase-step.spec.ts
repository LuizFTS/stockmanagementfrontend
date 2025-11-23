import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSupplierPurchaseStep } from './search-supplier-purchase-step';

describe('SearchSupplierPurchaseStep', () => {
  let component: SearchSupplierPurchaseStep;
  let fixture: ComponentFixture<SearchSupplierPurchaseStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSupplierPurchaseStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSupplierPurchaseStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
