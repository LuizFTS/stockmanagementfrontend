import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import type { User } from '../../../core/models/User.model';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

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
  user: User | null = null;
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private auth: AuthService,
  ) {}

  @Input() active: boolean = false;
  @Output() opened = new EventEmitter<boolean>();

  ngOnInit() {
    this.userService.$user.subscribe((user) => {
      this.user = user;
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  onToggleBar(event: boolean) {
    this.opened.emit(event);
  }

  onToggleItem(index: number) {
    console.log(this.activeIndex);
    if (!this.active && index !== 0 && index !== -1) {
      this.opened.emit(true);
    }
    if (index === -1) {
      this.navigate('/profile');
    }
    if (index === 0) {
      this.navigate('/home');
    }
    this.activeIndex = index;
  }

  onLogout() {
    this.auth.logout();
  }
}
