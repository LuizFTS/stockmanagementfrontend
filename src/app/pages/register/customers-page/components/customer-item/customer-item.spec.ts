import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItem } from './customer-item';

describe('CustomerItem', () => {
  let component: CustomerItem;
  let fixture: ComponentFixture<CustomerItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
