import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementPage } from './inventory-movement-page';

describe('InventoryMovementPage', () => {
  let component: InventoryMovementPage;
  let fixture: ComponentFixture<InventoryMovementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryMovementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
