import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchasePage } from './new-purchase-page';

describe('NewPurchasePage', () => {
  let component: NewPurchasePage;
  let fixture: ComponentFixture<NewPurchasePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPurchasePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
