import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSupplierPage } from './add-new-supplier-page';

describe('AddNewSupplierPage', () => {
  let component: AddNewSupplierPage;
  let fixture: ComponentFixture<AddNewSupplierPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewSupplierPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
