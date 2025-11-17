import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-sidebar-menu-sub-option',
  imports: [],
  templateUrl: './sidebar-menu-sub-option.html',
  styleUrl: './sidebar-menu-sub-option.scss',
})
export class SidebarMenuSubOption {
  @Input() active: boolean = false;
  @Input() text: string = '';
  @Input() path: string = '';

  @Output() close = new EventEmitter<void>();
  private router = inject(Router);

  navigate() {
    if (window.innerWidth < 1024) {
      this.onClose();
    }
    this.router.navigate([this.path]);
  }

  private onClose() {
    this.close.emit();
  }
}
