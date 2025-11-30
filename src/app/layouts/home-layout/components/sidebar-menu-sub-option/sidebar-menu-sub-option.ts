import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-sidebar-menu-sub-option',
  imports: [],
  templateUrl: './sidebar-menu-sub-option.html',
  styleUrl: './sidebar-menu-sub-option.scss',
})
export class SidebarMenuSubOption {
  @Input() barActive = false;
  @Input() active = false;
  @Input() text = '';
  @Input() path = '';

  @Output() close = new EventEmitter<void>();

  private readonly router = inject(Router);

  /**
   * Computa as classes CSS baseadas no estado ativo
   */
  get containerClasses(): string {
    const classes = ['option-container'];

    if (this.active) {
      classes.push('active');
    }

    if (this.barActive) {
      classes.push('bar-active');
    }

    return classes.join(' ');
  }

  /**
   * Navega para o path configurado e fecha sidebar em mobile
   */
  handleClick(): void {
    if (this.isMobileView()) {
      this.close.emit();
    }

    this.router.navigate([this.path]);
  }

  private isMobileView(): boolean {
    return window.innerWidth < 1024;
  }
}
