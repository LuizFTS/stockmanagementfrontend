import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SideBarMenuOption } from '../sidebar-menu-option/sidebar-menu-option';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SidebarMenuSubOption } from '../sidebar-menu-sub-option/sidebar-menu-sub-option';

interface Menu {
  name: string;
  itens: MenuItem[];
  icon: string;
}

interface MenuItem {
  item: string;
  path: string;
  active: boolean;
}

const MENU = [
  { name: 'Inicio', itens: [], icon: 'home' },
  {
    name: 'Compras',
    itens: [
      { item: 'Adicionar compra', path: '/purchases/add', active: false },
      { item: 'Histórico de compras', path: '/purchases/history', active: false },
    ],
    icon: 'shopping_cart',
  },
  {
    name: 'Vendas',
    itens: [
      { item: 'Adicionar venda', path: '/sales/add', active: false },
      { item: 'Histórico de vendas', path: '/sales/history', active: false },
    ],
    icon: 'paid',
  },
  {
    name: 'Estoque',
    itens: [
      { item: 'Produtos', path: '/inventory/products', active: false },
      { item: 'Movimentação do estoque', path: '/inventory/movement', active: false },
    ],
    icon: 'inventory_2',
  },
  {
    name: 'Cadastro',
    itens: [
      { item: 'Clientes', path: '/register/customers', active: false },
      { item: 'Fornecedores', path: '/register/suppliers', active: false },
    ],
    icon: 'list_alt_check',
  },
];

@Component({
  selector: 'stk-sidebar',
  imports: [RouterLinkActive, RouterModule, SideBarMenuOption, SidebarMenuSubOption],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuData: Menu[] = MENU;
  itemIndex: number | null = null;
  subItemIndex: number | null = null;
  user: string | null = null;
  private router = inject(Router);

  constructor(
    private userService: UserService,
    private auth: AuthService,
  ) {}

  @Input() active: boolean = false;
  @Output() opened = new EventEmitter<boolean>();

  ngOnInit() {
    this.userService.getUserFullName().subscribe((fullname) => {
      this.user = fullname ?? '';
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  onToggleBar(event: boolean) {
    this.opened.emit(event);
  }

  onToggleItem(index: number) {
    if (!this.active && index !== 0 && index !== -1) {
      this.opened.emit(true);
    }
    if (index === -1) {
      this.navigate('/profile');
      this.onToggleBar(false);
    }
    if (index === 0) {
      this.navigate('/home');
      this.onToggleBar(false);
    }
    this.subItemIndex = null;
    this.itemIndex = index;
  }

  onToggleSubItem(itemIndex: number) {
    this.subItemIndex = itemIndex;
  }

  onLogout() {
    this.auth.logout();
  }

  private deactivateSubItens() {
    this.menuData.forEach((item) => {
      item.itens.forEach((i) => {
        i.active = false;
      });
    });
  }
}
