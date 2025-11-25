import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormLayout } from './update-form-layout';

describe('UpdateFormLayout', () => {
  let component: UpdateFormLayout;
  let fixture: ComponentFixture<UpdateFormLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
