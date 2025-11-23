interface PurchaseItem {
  productId: string;
  quantity: number;
}

export interface AddPurchaseRequest {
  supplierId: string;
  itens: PurchaseItem[];
}
