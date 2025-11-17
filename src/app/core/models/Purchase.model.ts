import type { PurchaseItem } from './PurchaseItem.model';

interface Supplier {
  id: string;
  name: string;
}

interface Buyer {
  id: string;
  name: string;
}

export interface Purchase {
  id: string;
  supplier: Supplier;
  buyer: Buyer;
  totalValue: number;
  createdAt: string;
  itens: PurchaseItem[];
}
