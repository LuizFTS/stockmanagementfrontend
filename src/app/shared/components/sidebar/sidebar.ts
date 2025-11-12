import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

interface Menu {
  name: string;
  itens: MenuItem[];
  icon: string;
}

interface MenuItem {
  item: string;
  path: string;
}

const MENU = [
  { name: 'Inicio', itens: [], icon: 'home' },
  {
    name: 'Compras',
    itens: [
      { item: 'Adicionar compra', path: '/purchases/add' },
      { item: 'Histórico de compras', path: '/purchases/history' },
    ],
    icon: 'shopping_cart',
  },
  {
    name: 'Vendas',
    itens: [
      { item: 'Adicionar venda', path: '/sales/add' },
      { item: 'Histórico de vendas', path: '/sales/history' },
    ],
    icon: 'paid',
  },
  {
    name: 'Estoque',
    itens: [
      { item: 'Produtos', path: '/inventory/products' },
      { item: 'Movimentação do estoque', path: '/inventory/movement' },
    ],
    icon: 'inventory_2',
  },
  {
    name: 'Cadastro',
    itens: [
      { item: 'Clientes', path: '/register/customers' },
      { item: 'Fornecedores', path: '/register/suppliers' },
    ],
    icon: 'list_alt_check',
  },
];

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuData: Menu[] = MENU;
  activeIndex: number | null = null;

  @Input() active: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  toggleItem(index: number) {
    console.log(index);
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
