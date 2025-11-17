import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-sidebar-menu-option',
  imports: [MatIcon],
  templateUrl: './sidebar-menu-option.html',
  styleUrl: './sidebar-menu-option.scss',
})
export class SideBarMenuOption {
  className: string = '';

  @Input() icon: string | null = null;
  @Input() text: string | null = null;
  @Input() arrow: string | null = null;
  @Input() barActive: boolean = false;
  @Input() itemActive: boolean = false;
  @Input() type: string = 'default';
  @Output() action = new EventEmitter();

  onClick() {
    this.action.emit();
  }

  ngOnChanges() {
    this.className = [this.barActive ? 'barActive' : '', this.itemActive ? 'itemActive' : '']
      .filter(Boolean)
      .join(' ');
  }
}
