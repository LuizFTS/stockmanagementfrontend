interface SaleItem {
  productId: string;
  quantity: number;
}

export interface AddSaleRequest {
  customerId: string;
  itens: SaleItem[];
}
