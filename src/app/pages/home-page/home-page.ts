import { Component, type OnInit } from '@angular/core';
import { UserService } from '../../core/services/api/user.service';
import type { User } from '../../core/models/User.model';
import type { Sale } from '../../core/models/Sale.model';
import type { Purchase } from '../../core/models/Purchase.model';
import type { Product } from '../../core/models/Product.model';
import { Card } from '../../shared/components/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [Card, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  user: User | null = null;

  // Mock Data
  summaryMetrics = {
    salesToday: 2453.60,
    salesCountToday: 35,
    purchasesToday: 1200.00,
    purchasesCountToday: 5,
    lowStockCount: 3
  };

  recentSales: Sale[] = [
    {
      id: '1',
      customer: { id: 'c1', name: 'João Silva' },
      seller: { id: 's1', name: 'Maria Oliveira' },
      totalValue: 150.00,
      createdAt: new Date().toISOString(),
      itens: []
    },
    {
      id: '2',
      customer: { id: 'c2', name: 'Ana Santos' },
      seller: { id: 's1', name: 'Maria Oliveira' },
      totalValue: 89.90,
      createdAt: new Date().toISOString(),
      itens: []
    },
    {
      id: '3',
      customer: { id: 'c3', name: 'Pedro Souza' },
      seller: { id: 's2', name: 'Carlos Pereira' },
      totalValue: 210.50,
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      itens: []
    }
  ];

  recentPurchases: Purchase[] = [
    {
      id: 'p1',
      supplier: { id: 'sup1', name: 'Fornecedor A' },
      buyer: { id: 'b1', name: 'Admin' },
      totalValue: 500.00,
      createdAt: new Date().toISOString(),
      itens: []
    },
    {
      id: 'p2',
      supplier: { id: 'sup2', name: 'Fornecedor B' },
      buyer: { id: 'b1', name: 'Admin' },
      totalValue: 700.00,
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      itens: []
    }
  ];

  lowStockProducts: Product[] = [
    {
      id: 'prod1',
      name: 'Teclado Mecânico',
      description: 'Teclado RGB',
      inventoryBalance: 2,
      active: true,
      costPrice: 100,
      salePrice: 200,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: 'prod2',
      name: 'Mouse Gamer',
      description: 'Mouse 16000 DPI',
      inventoryBalance: 0,
      active: true,
      costPrice: 50,
      salePrice: 120,
      createdAt: '',
      updatedAt: ''
    }
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loadUser();

    this.userService.$user.subscribe((user) => {
      this.user = user;
    });
  }
}
