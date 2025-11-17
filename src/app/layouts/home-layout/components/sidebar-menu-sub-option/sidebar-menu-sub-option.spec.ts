import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuSubOption } from './sidebar-menu-sub-option';

describe('SidebarMenuSubOption', () => {
  let component: SidebarMenuSubOption;
  let fixture: ComponentFixture<SidebarMenuSubOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenuSubOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMenuSubOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
