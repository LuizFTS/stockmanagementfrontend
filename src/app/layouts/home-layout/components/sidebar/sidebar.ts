import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { SideBarMenuOption } from '../sidebar-menu-option/sidebar-menu-option';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SidebarMenuSubOption } from '../sidebar-menu-sub-option/sidebar-menu-sub-option';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

interface MenuItem {
  label: string;
  path: string;
}

interface MenuSection {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

interface MenuState {
  activeSection: number | null;
  activeItem: number | null;
}

const MENU_CONFIG: MenuSection[] = [
  { id: 'home', label: 'Inicio', items: [], icon: 'home' },
  {
    id: 'purchases',
    label: 'Compras',
    items: [
      { label: 'Adicionar compra', path: '/purchases/add' },
      { label: 'Histórico de compras', path: '/purchases/history' },
    ],
    icon: 'shopping_cart',
  },
  {
    id: 'sales',
    label: 'Vendas',
    items: [
      { label: 'Adicionar venda', path: '/sales/add' },
      { label: 'Histórico de vendas', path: '/sales/history' },
    ],
    icon: 'paid',
  },
  {
    id: 'inventory',
    label: 'Estoque',
    items: [
      { label: 'Produtos', path: '/inventory/products' },
      { label: 'Movimentação do estoque', path: '/inventory/movement' },
    ],
    icon: 'inventory_2',
  },
  {
    id: 'registration',
    label: 'Cadastro',
    items: [
      { label: 'Clientes', path: '/customers' },
      { label: 'Fornecedores', path: '/suppliers' },
    ],
    icon: 'note_alt',
  },
];

const SPECIAL_ROUTES = {
  HOME: '/home',
  PROFILE: '/profile',
} as const;

const PROFILE_SECTION_INDEX = -1;
const HOME_SECTION_INDEX = 0;
const MOBILE_BREAKPOINT = 1024;

@Component({
  selector: 'stk-sidebar',
  imports: [RouterLinkActive, RouterModule, SideBarMenuOption, SidebarMenuSubOption],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() active: boolean = false;
  @Output() opened = new EventEmitter<boolean>();

  readonly menuData = MENU_CONFIG;
  menuState: MenuState = {
    activeSection: null,
    activeItem: null,
  };
  userName = '';

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadUserData();
    this.setupRouteTracking();
  }

  toggleSidebar(isOpen: boolean): void {
    this.opened.emit(isOpen);
    console.log(isOpen);
  }

  handleSectionClick(sectionIndex: number): void {
    const shouldAutoClose = this.isMobileView();

    // Abre sidebar se necessário (exceto para home e profile)
    if (!this.active && !this.isSpecialRoute(sectionIndex)) {
      this.toggleSidebar(true);
    }

    // Navega para rotas especiais
    if (this.isSpecialRoute(sectionIndex)) {
      this.navigateToSpecialRoute(sectionIndex);
      if (shouldAutoClose) {
        this.toggleSidebar(false);
      }
      return;
    }

    // Reseta subitem se mudou de seção
    if (this.menuState.activeSection !== sectionIndex) {
      this.menuState.activeItem = null;
    }

    // Toggle da seção
    this.menuState.activeSection =
      this.menuState.activeSection === sectionIndex ? null : sectionIndex;
  }

  handleItemClick(itemIndex: number): void {
    this.menuState.activeItem = itemIndex;

    // Fecha sidebar em mobile após navegação
    if (this.isMobileView()) {
      this.toggleSidebar(false);
    }
  }

  logout() {
    this.authService.logout();
  }

  private loadUserData(): void {
    this.userService
      .getUserFullName()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fullname) => {
        this.userName = fullname ?? '';
      });
  }

  private setupRouteTracking(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.updateMenuStateFromRoute();
      });
    this.updateMenuStateFromRoute();
  }

  private updateMenuStateFromRoute(): void {
    const currentUrl = this.router.url;

    if (currentUrl === SPECIAL_ROUTES.HOME) {
      this.menuState = { activeSection: HOME_SECTION_INDEX, activeItem: null };
      return;
    }

    if (currentUrl === SPECIAL_ROUTES.PROFILE) {
      this.menuState = { activeSection: PROFILE_SECTION_INDEX, activeItem: null };
      return;
    }

    for (let sectionIdx = 0; sectionIdx < this.menuData.length; sectionIdx++) {
      const section = this.menuData[sectionIdx];

      for (let itemIdx = 0; itemIdx < section.items.length; itemIdx++) {
        const item = section.items[itemIdx];

        if (currentUrl === item.path) {
          this.menuState = { activeSection: sectionIdx, activeItem: itemIdx };
          return;
        }
      }
    }
  }

  private isSpecialRoute(sectionIndex: number): boolean {
    return sectionIndex === 0 || sectionIndex === -1;
  }

  private navigateToSpecialRoute(sectionIndex: number): void {
    const route = sectionIndex === -1 ? SPECIAL_ROUTES.PROFILE : SPECIAL_ROUTES.HOME;
    this.router.navigate([route]);
  }

  private isMobileView(): boolean {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  isSectionActive(index: number): boolean {
    return this.menuState.activeSection === index;
  }

  isItemActive(sectionIndex: number, itemIndex: number): boolean {
    return this.menuState.activeSection === sectionIndex && this.menuState.activeItem === itemIndex;
  }

  shouldShowSubItems(index: number): boolean {
    return this.menuData[index].items.length > 0 && this.isSectionActive(index);
  }

  isHomeSection(section: MenuSection): boolean {
    return section.id === 'home';
  }

  hasArrow(section: MenuSection): boolean {
    return !this.isHomeSection(section);
  }
}
