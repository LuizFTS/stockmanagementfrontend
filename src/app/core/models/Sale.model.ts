import type { SaleItem } from './SaleItem.model';

interface Customer {
  id: string;
  name: string;
}

interface Seller {
  id: string;
  name: string;
}

export interface Sale {
  id: string;
  customer: Customer;
  seller: Seller;
  totalValue: number;
  createdAt: string;
  itens: SaleItem[];
}
