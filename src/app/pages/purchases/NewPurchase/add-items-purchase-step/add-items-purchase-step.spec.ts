import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsPurchaseStep } from './add-items-purchase-step';

describe('AddItemsPurchaseStep', () => {
  let component: AddItemsPurchaseStep;
  let fixture: ComponentFixture<AddItemsPurchaseStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemsPurchaseStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemsPurchaseStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
