import { Component, Input } from '@angular/core';
import type { InventoryMovement } from '../../../../../core/models/InventoryMovement.model';

@Component({
  selector: 'stk-inventory-item-component',
  imports: [],
  templateUrl: './inventory-item-component.html',
  styleUrl: './inventory-item-component.scss',
})
export class InventoryItemComponent {
  @Input() inventoryMovement!: InventoryMovement;
}
