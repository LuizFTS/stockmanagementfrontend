import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierItem } from './supplier-item';

describe('SupplierItem', () => {
  let component: SupplierItem;
  let fixture: ComponentFixture<SupplierItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
