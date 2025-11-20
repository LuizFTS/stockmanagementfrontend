import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
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
      { item: 'Clientes', path: '/customers' },
      { item: 'Fornecedores', path: '/suppliers' },
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
  index: { itemIndex: number | null; subItemIndex: number | null } = {
    itemIndex: null,
    subItemIndex: null,
  };
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
    const shouldCloseBar = window.innerWidth < 1024;

    if (!this.active && index !== 0 && index !== -1) {
      this.onToggleBar(true);
    }

    switch (index) {
      case -1:
        this.navigate('/profile');
        if (shouldCloseBar) this.onToggleBar(false);
        break;
      case 0:
        this.navigate('/home');
        if (shouldCloseBar) this.onToggleBar(false);
        break;
    }

    if (this.index.itemIndex !== index && this.index.itemIndex) {
      this.index.subItemIndex = null;
    }

    this.index.itemIndex = this.index.itemIndex === index ? null : index;
  }

  onToggleSubItem(itemIndex: number) {
    this.index.subItemIndex = itemIndex;
  }

  onLogout() {
    this.auth.logout();
  }
}
