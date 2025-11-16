import type { SaleItem } from './SaleItem.model';

export interface Sale {
  id: string;
  customerId: string;
  sellerId: string;
  totalValue: number;
  itens: SaleItem[];
}
