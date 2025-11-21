import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierPage } from './update-supplier-page';

describe('UpdateSupplierPage', () => {
  let component: UpdateSupplierPage;
  let fixture: ComponentFixture<UpdateSupplierPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSupplierPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSupplierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
