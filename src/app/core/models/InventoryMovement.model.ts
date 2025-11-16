import type { InventoryMovementType } from '../enums/InventoryMovementType.enum';
import type { Product } from './Product.model';

export interface InventoryMovement {
  id: string;
  product: Product;
  balance: number;
  previousBalance: number;
  type: InventoryMovementType;
  createdAt: string;
}
