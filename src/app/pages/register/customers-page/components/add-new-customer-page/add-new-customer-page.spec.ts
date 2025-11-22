import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCustomerPage } from './add-new-customer-page';

describe('AddNewCustomerPage', () => {
  let component: AddNewCustomerPage;
  let fixture: ComponentFixture<AddNewCustomerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCustomerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
