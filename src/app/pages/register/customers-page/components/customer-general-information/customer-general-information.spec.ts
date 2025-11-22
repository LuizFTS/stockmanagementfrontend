import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGeneralInformation } from './customer-general-information';

describe('CustomerGeneralInformation', () => {
  let component: CustomerGeneralInformation;
  let fixture: ComponentFixture<CustomerGeneralInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerGeneralInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerGeneralInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
