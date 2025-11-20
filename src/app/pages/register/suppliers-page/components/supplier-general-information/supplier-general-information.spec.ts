import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGeneralInformation } from './supplier-general-information';

describe('SupplierGeneralInformation', () => {
  let component: SupplierGeneralInformation;
  let fixture: ComponentFixture<SupplierGeneralInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierGeneralInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierGeneralInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
