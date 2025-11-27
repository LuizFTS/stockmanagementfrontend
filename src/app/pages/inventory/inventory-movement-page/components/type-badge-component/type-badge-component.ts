import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-type-badge-component',
  imports: [MatIcon],
  templateUrl: './type-badge-component.html',
  styleUrl: './type-badge-component.scss',
})
export class TypeBadgeComponent {
  @Input() type!: string;

  get typeBadgeColor() {
    switch (this.type) {
      case 'ENTRADA':
        return 'entry';
      case 'SAIDA':
        return 'exit';
      default:
        return 'none';
    }
  }

  get typeBadgeIcon() {
    switch (this.type) {
      case 'ENTRADA':
        return 'north_east';
      case 'SAIDA':
        return 'south_east';
      default:
        return 'none';
    }
  }
}
