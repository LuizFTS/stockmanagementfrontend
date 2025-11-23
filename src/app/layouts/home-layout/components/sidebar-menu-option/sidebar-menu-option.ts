import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-sidebar-menu-option',
  imports: [MatIcon],
  templateUrl: './sidebar-menu-option.html',
  styleUrl: './sidebar-menu-option.scss',
})
export class SideBarMenuOption {
  @Input() icon: string | null = null;
  @Input() text: string | null = null;
  @Input() arrow: string | null = null;
  @Input() barActive = false;
  @Input() itemActive = false;

  @Output() action = new EventEmitter<void>();

  /**
   * Computa as classes CSS baseadas no estado do componente
   */
  get containerClasses(): string {
    const classes: string[] = ['option-container'];

    if (this.barActive) {
      classes.push('bar-active');
    }

    if (this.itemActive) {
      classes.push('item-active');
    }

    return classes.join(' ');
  }

  /**
   * Determina qual conjunto de ícones usar baseado no estado ativo
   */
  get iconFontSet(): string {
    return this.itemActive ? 'material-icons' : 'material-icons-outlined';
  }

  /**
   * Verifica se deve renderizar o componente
   */
  get shouldRender(): boolean {
    return !!(this.icon || this.text || this.arrow);
  }

  handleClick(): void {
    this.action.emit();
  }
}
