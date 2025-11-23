import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsSaleStep } from './add-items-sale-step';

describe('AddItemsSaleStep', () => {
  let component: AddItemsSaleStep;
  let fixture: ComponentFixture<AddItemsSaleStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemsSaleStep]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemsSaleStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
