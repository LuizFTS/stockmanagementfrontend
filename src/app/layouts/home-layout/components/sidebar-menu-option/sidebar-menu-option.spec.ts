import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuOption } from './sidebar-menu-option';

describe('SidebarMenuOption', () => {
  let component: SidebarMenuOption;
  let fixture: ComponentFixture<SidebarMenuOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMenuOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMenuOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
