import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'stk-sidebar-menu-sub-option',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu-sub-option.html',
  styleUrl: './sidebar-menu-sub-option.scss',
})
export class SidebarMenuSubOption {
  @Input() barActive = false;
  @Input() text = '';
  @Input() path = '';

  @Output() close = new EventEmitter<void>();

  /**
   * Computa as classes CSS baseadas no estado ativo
   */
  get containerClasses(): string {
    const classes = ['option-container'];

    if (this.barActive) {
      classes.push('bar-active');
    }

    return classes.join(' ');
  }

  /**
   * Navega para o path configurado e fecha sidebar em mobile
   */
  handleClick(): void {
    this.close.emit();
  }
}
