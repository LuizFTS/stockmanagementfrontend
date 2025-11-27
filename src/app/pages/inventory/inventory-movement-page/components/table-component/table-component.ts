import { Component, Input } from '@angular/core';
import { Card } from '../../../../../shared/components/card/card';
import { TypeBadgeComponent } from '../type-badge-component/type-badge-component';
import type { InventoryMovement } from '../../../../../core/models/InventoryMovement.model';
import { Formatter } from '../../../../../shared/utils/Formatter';

@Component({
  selector: 'stk-table-component',
  imports: [Card, TypeBadgeComponent],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {
  @Input() inventoryMovements: InventoryMovement[] = [];

  currentMovementValue(
    previousBalance: number,
    currentBalance: number,
  ): { value: string; class: string } {
    if (currentBalance > previousBalance)
      return { value: `+${currentBalance - previousBalance}`, class: 'positive' };
    return { value: `-${previousBalance - currentBalance}`, class: 'negative' };
  }

  formatDate(date: string) {
    return Formatter.date(date);
  }

  formatHour(date: string) {
    return Formatter.hours(date);
  }
}
