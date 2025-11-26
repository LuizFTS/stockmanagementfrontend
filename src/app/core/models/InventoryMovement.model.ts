import type { Product } from './Product.model';

export interface InventoryMovement {
  id: string;
  product: Product;
  balance: number;
  previousBalance: number;
  type: string;
  createdAt: string;
}
