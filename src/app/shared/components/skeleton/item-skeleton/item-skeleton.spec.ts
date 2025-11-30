import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSkeleton } from './item-skeleton';

describe('ItemSkeleton', () => {
  let component: ItemSkeleton;
  let fixture: ComponentFixture<ItemSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
