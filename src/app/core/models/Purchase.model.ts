import type { PurchaseItem } from './PurchaseItem.model';

export interface Purchase {
  id: string;
  supplierId: string;
  buyerId: string;
  totalValue: number;
  itens: PurchaseItem[];
}
